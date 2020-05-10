const flatCache = require('flat-cache')
const { resolve } = require('path')

const dirDb = flatCache.load('dirDb', resolve(__dirname, '../../.cache/path'));
const fileDb = flatCache.load('fileDb', resolve(__dirname, '../../.cache/path'));
const resolvePath = async (req, res, next) => {
    if (req.url !== '/') {
        const url = req.url || req.originalUrl
        const relativeUrl = url.split('/')[1]
        console.log(relativeUrl)
        const asset = await dirDb.getKey(relativeUrl) || await fileDb.getKey(relativeUrl)
        if (asset) {
            const { location: relativePath } = asset
            req.locals = relativePath;
            next()
        } else {
            res.json({ message: "unknown Url Requested", status: "Ok", code: 200 });
        }
    } else {
        next()
    }
}
module.exports = resolvePath