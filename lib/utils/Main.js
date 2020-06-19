const { promisify } = require('util');
let { readdir, stat, createReadStream, createWriteStream } = require('fs');
const { v4: uuid4 } = require('uuid');
const { resolve } = require('path');
const EventEmitter = require('events');
const fileType = require('file-type');
const mimeType = require('mime-types');

readdir = promisify(readdir);
stat = promisify(stat);

class Main extends EventEmitter {
	constructor(dirname) {
		super();
		this.dir = dirname;
	}
	async listDirectory() {
		if (await this.isFile()) return await this.readFile();
		const dirs = await readdir(this.dir);

		let data = this.processDirectory(dirs);
		data = await Promise.all(data);
		this.emit('data', data);
		return data;
	}
	processDirectory(dirArray) {
		return dirArray.map(async (e) => {
			const filepath = resolve(this.dir, e);
			return await this.processAsset(filepath, e);
		});
	}
	async processAsset(assetpath, filename) {
		const stats = await stat(assetpath);
		let fileAsset = Object.assign(
			{},
			{ uuid: uuid4(), name: filename, dirname: this.dir, location: assetpath }
		);
		if (stats.isFile()) {
			let mime = {};
			fileAsset.type = 'file';
			const fileTypes = await fileType.fromFile(assetpath);
			mime.mime = mimeType.lookup(assetpath);
			fileAsset = Object.assign({}, fileAsset, mime, fileTypes);
		}
		if (stats.isDirectory()) {
			fileAsset.type = 'directory';
			const dirs = await readdir(assetpath);
			fileAsset.items = dirs.length;
		}
		fileAsset.lastModified = stats.mtime;
		fileAsset.birthTime = stats.birthtime;
		fileAsset.size = stats.size;
		return fileAsset;
	}
	async isFile() {
		const stats = await stat(this.dir);
		return stats.isFile();
	}
	async isDir() {
		const stats = await stat(this.dir);
		return stats.isDirectory();
	}
	readFile() {
		return createReadStream(this.dir);
	}
	writeFile() {
		return createWriteStream(this.dir);
	}
}
module.exports = Main;
