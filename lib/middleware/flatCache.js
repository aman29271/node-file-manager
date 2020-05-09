const flatCache = require('flat-cache')
const { resolve } = require('path')

const cache = flatCache.load('dirAsset', resolve(__dirname, '../..', '.cache'));

const flatCacheMiddleware = (req, res, next) => {
    let key = '__express' + req.url || req.originalUrl;
    let cachecontent = cache.getKey(key);
    if (cachecontent) {
        res.send(cachecontent)
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            cache.setKey(key, body);
            cache.save()
            res.sendResponse(body)
        }
        next()
    }
}
module.exports = flatCacheMiddleware