const { resolve } = require('path');
const { promisify } = require('util');
let {
	createWriteStream,
	readFile,
	existsSync,
	writeFile,
	mkdir,
	stat,
} = require('fs');

readFile = promisify(readFile);
stat = promisify(stat);
writeFile = promisify(writeFile);

class Cache {
	constructor(dir, name = 'data.json') {
		this.CACHE_DIR = resolve(__dirname, '../..', '.cache');
		this.dir = resolve(this.CACHE_DIR, dir);
		this.filename = resolve(this.dir, name);
		this.data = [];
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
			let data = await readFile(this.filename, { encoding: 'utf8' });
			data = JSON.parse(data);
			return data.find((e) => e.uuid === key);
		} catch (err) {
			return err;
		}
	}
	async set(key, value) {
		try {
			const Obj = Object.assign({}, { uuid: key }, value);
			this.myDataCollector.emit('data', Obj);
		} catch (err) {
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
		let fetchedData = await readFile(this.filename, { encoding: 'utf8' });
		fetchedData = JSON.parse(fetchedData);
		fetchedData = data.concat(fetchedData);
		const wstream = createWriteStream(this.filename);
		wstream.setDefaultEncoding('utf8');
		wstream.write(JSON.stringify(fetchedData), (err) => {
			if (err) throw err;
		});
		wstream.on('error', (err) => {
			throw err;
		});
	}
}
module.exports = Cache;
