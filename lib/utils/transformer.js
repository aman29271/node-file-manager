const sharp = require('sharp');

module.exports = (w, h, chunk) => {
	return sharp(chunk)
		.resize(w, h)
		.on('error', (err) => {
			if (err) throw err;
		});
};
