const fileType = require('file-type');
const mimeType = require('mime-types');
const processImage = require('../utils/processImage');
const processMedia = require('../utils/processMedia');

const isFile = async (req, res) => {
	const { mime } = fileType.fromFile(req.locals);
	switch (mime || mimeType.lookup(req.locals)) {
		case 'image/jpeg':
		case 'image/svg+xml':
		case 'image/png':
			processImage(req, res);
			break;
		case 'video/mp4':
		case 'video/x-matroska':
			processMedia(req, res);
			break;
		case 'application/json':
		case 'application/pdf':
			processMedia(req, res);
			break;
		default:
			processMedia(req, res);
			break;
	}
};
module.exports = isFile;
