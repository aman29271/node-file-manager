const flatCache = require('flat-cache')
const { resolve } = require('path')

const pathdb = flatCache.load('path', resolve(__dirname, '../../.cache/path'));
const assetdb = flatCache.load('dirAsset', resolve(__dirname, '../../.cache'))

const asset = assetdb.all();

const resolvePath = (req, res, next) => {
    const url = req.url || req.originalUrl;
    console.log(asset);
    next()

}
module.exports = resolvePath