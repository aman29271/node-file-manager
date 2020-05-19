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
	res.write(JSON.stringify(err));
}

function chunkFn(chunk) {
	chunkLength = Buffer.byteLength(chunk, 'utf8') + chunkLength;
	res.write(chunk);
}
