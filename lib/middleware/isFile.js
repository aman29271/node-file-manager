const { createReadStream } = require('fs');
const sharp = require('sharp');
const { extname } = require('path');
const processImage = require('../utils/processImage');
const processMedia = require('../utils/processMedia');

const isFile = (req, res) => {
	const ext = extname(req.locals);
	switch (ext) {
		case '.png':
		case '.PNG':
		case '.jpg':
		case '.JPEG':
		case '.gif':
		case '.jpeg':
			processImage(req, res);
			break;
		case '.mp4':
			processMedia(req, res);
			break;
		case '.json':
			processMedia(req, res);
			break;
		case '.pdf':
			processMedia(req, res);
			break;
		default:
			processImage(req, res);
			break;
	}
	function unknownFormat() {
		let chunkLength = 0;
		const pipeline = sharp();
		const rstream = createReadStream(req.locals);
		const inputstream = rstream.pipe(pipeline);
		inputstream.on('error', () => {
			res.json({ message: 'unknown format', status: 'OK', code: 200 });
		});

		inputstream.on('data', chunkFn);
		inputstream.on('end', endFn);

		function chunkFn(chunk) {
			chunkLength = Buffer.byteLength(chunk, 'utf8') + chunkLength;
			res.write(chunk);
		}

		function endFn() {
			const isHeadersSent = res.headersSent;
			if (!isHeadersSent) {
				res.setHeader('Content-Length', chunkLength);
				res.end();
			}
			res.contentSize = chunkLength;
			res.end();
		}
	}
	// let chunkLength = 0;
	// rstream.on('data', chunkFn);
	// rstream.on('end', endFn);

	// res.on('error', errorFn);
	// rstream.on('error', errorFn);

	// function endFn() {
	// 	const isHeadersSent = res.headersSent;
	// 	if (!isHeadersSent) {
	// 		res.setHeader('Content-Length', chunkLength);
	// 		res.end();
	// 	}
	// 	res.contentSize = chunkLength;
	// 	res.end();
	// }

	// function errorFn(err) {
	// 	console.error(err);
	// 	res.write(JSON.stringify(err));
	// }

	// function chunkFn(chunk) {
	// 	chunkLength = Buffer.byteLength(chunk, 'utf8') + chunkLength;
	// 	res.write(chunk);
	// }
};
module.exports = isFile;
