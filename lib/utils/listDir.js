const { promisify } = require('util')
let { readdir, stat, createReadStream, createWriteStream } = require('fs')
const { v4: uuid4 } = require('uuid')
const { resolve } = require('path')

readdir = promisify(readdir)
stat = promisify(stat)
createReadStream = promisify(createReadStream)
createWriteStream = promisify(createWriteStream)

class Main {
    constructor(dirname) {
        this.dir = dirname
    }
    async listDirectory() {
        const dirs = await readdir(this.dir)
        return await this.processDirectory(dirs);
    }
    async processDirectory(dirArray) {
        return await dirArray.map(async (e) => {
            const filepath = resolve(this.dir, e)
            return this.processAsset(filepath, e);
        })
    }
    async processAsset(assetpath, filename) {
        const stats = await stat(assetpath);
        const fileAsset = Object.assign({}, { uuid: uuid4(), name: filename, dirname: this.dir, location: assetpath })
        stats.isFile() ? fileAsset.type = 'file' : null;
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
    async isFile(filename) {
        const stats = await stat(filename)
        return stats.isFile()
    }
    async isDir(dirname) {
        const stats = await stat(dirname)
        return stats.isDirectory()
    }
}
module.exports = Main