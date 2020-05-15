const { createReadStream } = require('fs');

module.exports = (req, res) => {
	let chunkLength = 0;
	const rstream = createReadStream(req.locals);

	rstream.on('data', (chunk) => {
		chunkLength = Buffer.byteLength(chunk, 'utf8') + chunkLength;
		res.write(chunk);
	});

	rstream.on('end', () => {
		const isHeadersSent = res.headersSent;
		if (!isHeadersSent) {
			res.setHeader('Content-Length', chunkLength);
			res.end();
		}
		res.contentSize = chunkLength;
		res.end();
	});

	res.on('error', errorFn);
	rstream.on('error', errorFn);

	function errorFn() {
		res.writeHead(500);
		res.end(JSON.stringify(err));
	}
};
