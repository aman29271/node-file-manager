const mimeType = require('mime-types');
const fileTypes = require('file-type');

module.exports = async (filepath) => {
	let mime = {};
	mime.mime = mimeType.lookup(filepath);
	const file = await fileTypes.fromFile(filepath);
	return Object.assign({}, mime, file);
};
