const { createReadStream } = require('fs');

function processMedia(req, res) {
	let chunkLength = 0;
	const rstream = createReadStream(req.locals);

	rstream.on('data', chunkFn);
	rstream.on('end', endFn);

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
module.exports = processMedia;
