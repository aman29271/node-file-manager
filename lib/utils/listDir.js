const { promisify } = require('util')
let { readdir, stat, createReadStream, createWriteStream } = require('fs')
const { v4: uuid4 } = require('uuid')
const { resolve } = require('path')
const EventEmitter = require('events')

readdir = promisify(readdir)
stat = promisify(stat)
createReadStream = promisify(createReadStream)
createWriteStream = promisify(createWriteStream)

class Main extends EventEmitter {
    constructor(dirname) {
        super()
        this.dir = dirname
    }
    async listDirectory() {
        if (await this.isFile()) return await this.readFile();
        const dirs = await readdir(this.dir)
        return await this.processDirectory(dirs);
    }
    async processDirectory(dirArray) {
        return await dirArray.map(async (e) => {
            const filepath = resolve(this.dir, e)
            return await this.processAsset(filepath, e);
        })
    }
    async processAsset(assetpath, filename) {
        const stats = await stat(assetpath);
        const fileAsset = Object.assign({}, { uuid: uuid4(), name: filename, dirname: this.dir, location: assetpath })
        if (stats.isFile()) {
            fileAsset.type = 'file'
            const { uuid, location } = fileAsset;
            const args = { uuid, location }
            this.emit('fileNodeFound', args)
        }
        if (stats.isDirectory()) {
            fileAsset.type = 'directory';
            const { uuid, location } = fileAsset;
            const args = { uuid, location }
            const dirs = await readdir(assetpath);
            fileAsset.items = dirs.length;
            this.emit('dirNodeFound', args);
        }
        fileAsset.lastModified = stats.mtime;
        fileAsset.birthTime = stats.birthtime;
        fileAsset.size = stats.size;
        return fileAsset;
    }
    async isFile() {
        const stats = await stat(this.dir)
        return stats.isFile()
    }
    async isDir() {
        const stats = await stat(this.dir)
        return stats.isDirectory()
    }
    async readFile() {
        return await createReadStream(this.dir);
    }
    async writeFile() {
        return await createWriteStream(this.dir)
    }
}
module.exports = Main