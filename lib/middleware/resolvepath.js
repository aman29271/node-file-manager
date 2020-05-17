const Cache = require('../utils/Cache');
const URL = require('url');

const dirDb = new Cache('path', 'dirdb.json');
const fileDb = new Cache('path', 'filedb.json');
const resolvePath = async (req, res, next) => {
	if (req.url !== '/') {
		const url = req.url || req.originalUrl;
		const relativeUrl = URL.parse(url).pathname.split('/')[1];
		const asset =
			(await dirDb.get(relativeUrl)) || (await fileDb.get(relativeUrl));
		if (asset) {
			const { location: relativePath } = asset;
			req.locals = relativePath;
			next();
		} else {
			res.json({ message: 'unknown Url Requested', status: 'Ok', code: 200 });
		}
	} else {
		next();
	}
};
module.exports = resolvePath;
