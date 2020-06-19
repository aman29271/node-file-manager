const sharp = require('sharp');
const { createReadStream } = require('fs');
const mime = require('./mime');
const send = require('send');

const maxAge = 120 * 1000;
module.exports = async (req, res) => {
	let chunkLength = 0;
	const rstream = createReadStream(req.locals);
	let { h: height, w: width } = req.query;

	height = Number(height);
	width = Number(width);
	const transformer = transformFn();
	let pipeline;
	if (transformer) {
		pipeline = rstream.pipe(transformer);
	} else {
		send(req, req.locals, { index: false, maxAge: maxAge })
			.on('error', errorFn)
			.pipe(res)
			.on('error', errorFn);
	}
	pipeline && pipeline.on('data', chunkFn).on('end', endFn);

	const mimeType = await mime(req.locals);
	const cacheControl = 'public, max-age=' + Math.floor(maxAge / 1000);
	transformer && !res.headersSent && res.setHeader('Content-Type', mimeType.mime);
	transformer && !res.headersSent && res.setHeader('Cache-Control', cacheControl);

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

	function infoFn(image) {
		if (!res.headersSent) {
			res.setHeader('Content-Length', image.size);
		}
	}

	function transformFn() {
		const pipeline = sharp().on('info', infoFn).on('error', errorFn).webp({ quality: 80 });
		if (!isNaN(width) && !isNaN(height)) return pipeline.resize(width, height);
		if (!isNaN(width)) return pipeline.resize(width);
		if (isNaN(width) && isNaN(height)) return;
		return sharp()
			.on('error', errorFn)
			.emit('error', { message: 'invalid arguments', status: 'OK', code: 200 });
	}
};
