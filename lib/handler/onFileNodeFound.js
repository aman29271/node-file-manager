const flatCache = require('flat-cache')
const { resolve } = require('path')

const pathdb = flatCache.load('fileDb', resolve(__dirname, '../../.cache/path'))

function fileDbHandler(args) {
    const { uuid, location } = args
    pathdb.setKey(uuid, {
        location
    })
    pathdb.save(true)
}
module.exports = fileDbHandler