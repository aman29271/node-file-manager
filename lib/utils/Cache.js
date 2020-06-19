const { resolve } = require('path');
const { promisify } = require('util');
let { createWriteStream, readFile, existsSync, writeFile, mkdir, stat } = require('fs');
readFile = promisify(readFile);
writeFile = promisify(writeFile);
stat = promisify(stat);

class Cache {
	constructor(dir, name = 'data.json') {
		this.CACHE_DIR = resolve(__dirname, '../..', '.cache');
		this.dir = resolve(this.CACHE_DIR, dir);
		this.filename = resolve(this.dir, name);
		this.data = [];
		this.lastModified = '';
		this.init();
	}
	init() {
		if (!existsSync(this.filename)) {
			mkdir(this.dir, { recursive: true }, (err) => {
				if (err) throw err;
				writeFile(this.filename, JSON.stringify(this.data), (err) => {
					if (err) throw err;
				});
			});
		}
	}
	async get(key) {
		try {
			let data;
			if (this.data.length > 0 && (await this.isFileModified())) {
				data = this.data;
			} else {
				data = await readFile(this.filename, { encoding: 'utf8' });
				data = JSON.parse(data);
				this.data = data;
			}
			return data.find((e) => e.uuid === key);
		} catch (err) {
			return err;
		}
	}
	async isFileModified() {
		try {
			const { mtimeMs } = await stat(this.filename);
			return mtimeMs === this.lastModified;
		} catch (err) {
			if (err) throw err;
		}
	}
	async loadAll() {
		try {
			let data;
			if (this.data.length > 0 && (await this.isFileModified())) {
				data = this.data;
			} else {
				data = await readFile(this.filename, { encoding: 'utf8' });
				data = JSON.parse(data);
				this.data = data;
			}
			return data;
		} catch (err) {
			return err;
		}
	}
	async getLocation(pathname) {
		try {
			let data;
			if (this.data.length > 0 && (await this.isFileModified())) {
				data = this.data;
			} else {
				data = await readFile(this.filename, { encoding: 'utf8' });
				data = JSON.parse(data);
				this.data = data;
			}
			return data.find((e) => e.location === pathname);
		} catch (err) {
			console.log(err);
			return err;
		}
	}
	async set(key, value) {
		try {
			const Obj = Object.assign({}, { uuid: key }, value);
			this.myDataCollector.emit('data', Obj);
		} catch (err) {
			console.log(err);
			return err;
		}
	}
	async update(key, value) {
		try {
			const data = await readFile(this.filename, { encoding: 'utf8' });
			const wstream = createWriteStream(this.filename, { flags: 'r+' });
			const Obj = data.find((e) => e.uuid === key);
			Obj.location = value;
			wstream.setDefaultEncoding('utf8');
			wstream.write(JSON.stringify(data));
			wstream.on('error', (err) => {
				throw err;
			});
			return false;
		} catch (err) {
			return err;
		}
	}
	writeData(writer, data, encoding, cb) {
		writer.write(data, encoding, cb);
		writer.on('error', (err) => {
			cb(err);
		});
	}
	async load(data) {
		const { size, mtimeMs } = await stat(this.filename);
		this.lastModified = mtimeMs;
		const wstream = createWriteStream(this.filename, { flags: 'r+', start: size - 1 });
		if (size > 2) {
			for (let i = 0; i < data.length; i++) {
				i === 0 && wstream.write(`,${JSON.stringify(data[i])},`);
				i < data.length - 1 && wstream.write(`${JSON.stringify(data[i])},`);
				if (i === data.length - 1) {
					wstream.write(`${JSON.stringify(data[i])}`);
					wstream.write(']');
				}
			}
		} else {
			for (let i = 0; i < data.length; i++) {
				i < data.length - 1 && wstream.write(`${JSON.stringify(data[i])},`);
				if (i === data.length - 1) {
					wstream.write(`${JSON.stringify(data[i])}`);
					wstream.write(']');
				}
			}
		}
		wstream.on('error', (err) => {
			throw err;
		});
	}
}
module.exports = Cache;
