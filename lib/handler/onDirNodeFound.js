const flatCache = require('flat-cache')
const { resolve } = require('path')

const pathdb = flatCache.load('dirDb', resolve(__dirname, '../../.cache/path'))
function dirDbHandler(args) {
    const { uuid, location } = args
    pathdb.setKey(uuid, {
        location
    })
    pathdb.save(true);
}
module.exports = dirDbHandler