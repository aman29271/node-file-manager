const { promisify } = require('util');
let { readdir, stat, createReadStream, createWriteStream } = require('fs');
const { v4: uuid4 } = require('uuid');
const { resolve, basename, extname } = require('path');
const EventEmitter = require('events');

readdir = promisify(readdir);
stat = promisify(stat);
createReadStream = promisify(createReadStream);
createWriteStream = promisify(createWriteStream);

class Main extends EventEmitter {
	constructor(dirname) {
		super();
		this.dir = dirname;
	}
	async listDirectory() {
		if (await this.isFile()) return await this.readFile();
		const dirs = await readdir(this.dir);

		const data = this.processDirectory(dirs);
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
		const fileAsset = Object.assign(
			{},
			{ uuid: uuid4(), name: filename, dirname: this.dir, location: assetpath }
		);
		if (stats.isFile()) {
			fileAsset.type = 'file';
			switch (extname(assetpath)) {
				case '.mkv':
					fileAsset.mimetype = 'video/x-matroska';
					break;
				case '.avi':
				case '.mp4':
					fileAsset.mimetype = 'video/mp4';
					break;
				case '.mp3':
					fileAsset.mimetype = 'video/mp3';
					break;
				case '.jpg':
				case '.jpeg':
				case '.JPEG':
				case '.JPG':
					fileAsset.mimetype = 'image/jpeg';
					break;
				case '.png':
				case '.PNG':
					fileAsset.mimetype = 'image/png';
					break;
				case '.json':
					fileAsset.mimetype = 'json';
					break;
				case '.pdf':
					fileAsset.mimetype = 'pdf';
					break;
				default:
					fileAsset.mimetype = 'image/jpeg';
					break;
			}
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
