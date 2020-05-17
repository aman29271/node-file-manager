const { createReadStream } = require('fs');
const sharp = require('sharp');
// const transformer = require('../utils/transformer');

module.exports = (req, res) => {
	let chunkLength = 0;
	const rstream = createReadStream(req.locals);
	let { h: height, w: width } = req.query;
	height = Number(height);
	width = Number(width);
	if (req.query.h) {
		const transformer = sharp().resize(width, height).on('error', errorFn);
		const pipeline = rstream.pipe(transformer);
		pipeline.on('data', chunkFn);
		pipeline.on('end', endFn);
	} else {
		rstream.on('data', chunkFn);
		rstream.on('end', endFn);
	}

	res.on('error', errorFn);
	rstream.on('error', errorFn);

	function endFn() {
		const isHeadersSent = res.headersSent;
		if (!isHeadersSent) {
			res.setHeader('Content-Length', chunkLength);
			res.end();
		}
		res.contentSize = chunkLength;
		res.end();
	}

	function errorFn(err) {
		res.writeHead(500);
		res.end(JSON.stringify(err));
	}

	function chunkFn(chunk) {
		chunkLength = Buffer.byteLength(chunk, 'utf8') + chunkLength;
		res.write(chunk);
	}
};
