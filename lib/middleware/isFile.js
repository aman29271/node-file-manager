const processImage = require('../utils/processImage');
const processMedia = require('../utils/processMedia');
const mimeType = require('../utils/mime');

const isFile = async (req, res) => {
	const { mime } = await mimeType(req.locals);
	switch (mime) {
		case 'image/jpeg':
		case 'image/svg+xml':
		case 'image/png':
			await processImage(req, res);
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
