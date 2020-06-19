const send = require('send');

function processMedia(req, res) {
	send(req, req.locals, { index: false, maxAge: 120 * 1000 })
		.on('error', errorFn)
		.pipe(res)
		.on('error', errorFn);

	function errorFn(err) {
		console.error(err);
		console.log(req.locals);
		res.write(JSON.stringify(err));
	}
}
module.exports = processMedia;
