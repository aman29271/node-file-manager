const sharp = require('sharp');
const { createReadStream } = require('fs');

module.exports = (req, res) => {
	let chunkLength = 0;
	const rstream = createReadStream(req.locals);
	let { h: height, w: width } = req.query;

	height = Number(height);
	width = Number(width);

	const transformer = transformFn();
	const pipeline = rstream.pipe(transformer);
	pipeline.on('data', chunkFn);
	pipeline.on('end', endFn);

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
		console.error(err);
		console.log(req.locals);
		res.write(JSON.stringify(err));
	}

	function chunkFn(chunk) {
		chunkLength = Buffer.byteLength(chunk, 'utf8') + chunkLength;
		res.write(chunk);
	}

	function transformFn() {
		if (!isNaN(width) && !isNaN(height)) return sharp().resize(width, height).on('error', errorFn);
		if (!isNaN(width)) return sharp().resize(width).on('error', errorFn);
		if (isNaN(width) && isNaN(height)) return sharp().on('error', errorFn);
		return sharp()
			.on('error', errorFn)
			.emit('error', { message: 'invalid arguments', status: 'OK', code: 200 });
	}
};
