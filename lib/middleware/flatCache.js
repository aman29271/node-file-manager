const flatCache = require('flat-cache');
const { resolve, relative } = require('path');

const CacheMiddleware = (req, res, next) => {
	const ROOT_PATH = resolve(__dirname, '../../data');
	const requestPath = req.locals ? req.locals : `${ROOT_PATH}/`;
	const relativepath = relative(ROOT_PATH, requestPath);
	const cache = flatCache.load('data.json', resolve(__dirname, '../..', '.cache'));
	let key = '__express' + req.url || req.originalUrl;
	let cachecontent = cache.getKey(key);
	if (cachecontent) {
		res.send(cachecontent);
	} else {
		res.sendResponse = res.send;
		res.send = (body) => {
			cache.setKey(key, body);
			cache.save(true);
			res.sendResponse(body);
		};
		next();
	}
};
module.exports = CacheMiddleware;
