const { token } = require('gen-uid');
const chalk = require('chalk');
const os = require('os');

module.exports = (req, res, next) => {
	const tokenAssigned = token(true).substr(0, 8);
	const startTime = process.hrtime();
	req.requestId = tokenAssigned;
	res.requestId = tokenAssigned;

	function cleanupFn() {
		res.removeListener('error', errorFn);
		res.removeListener('finish', logFn);
		res.removeListener('close', abortFn);
	}
	function logFn() {
		cleanupFn();
		const size = res.get('Content-Length') || res.contentSize || 0;
		const statusCode =
			res.statusCode >= 200 || res.statusCode === 304 || res.statusCode < 300
				? chalk.green(res.statusCode)
				: chalk.red(res.statusCode);
		const timing = chalk.magenta(new Date().toString().substr(16, 8));
		fancyOutput(timing, req, statusCode, res, timeTken, size, startTime);
		delete req.locals, req.contentSize, req.parent;
		function timeTken(start) {
			const diff = process.hrtime(start);
			return diff[0] * 1000 + diff[1] / 1e6;
		}
	}
	function abortFn() {
		cleanupFn();
		console.warn(`[${res.requestId}] Request aborted by client`);
	}
	function errorFn() {
		cleanupFn();
		console.info(`[${res.requestId}] an Error Ocurred.`);
	}

	res.on('finish', logFn);
	res.on('error', errorFn);
	res.on('close', abortFn);
	next();
};

function fancyOutput(timing, req, statusCode, res, timeTken, size, startTime) {
	const { columns } = process.stdout;
	if (columns > 100) {
		const str = `[${timing}]` + chalk.yellow(` ${req.method}`) + chalk.bold(` ${req.originalUrl}`);
		process.stdout.write(str);
		process.stdout.cursorTo(Math.floor(columns * 0.5));
		process.stdout.write(
			` ${statusCode} ` +
				chalk.green(res.statusMessage) +
				chalk.bold(` ${timeTken(startTime)}ms`) +
				chalk.cyan(` ${size} bytes;`)
		);
		process.stdout.write(os.EOL);
	} else {
		console.info(
			`[${timing}]` +
				chalk.yellow(` ${req.method}`) +
				chalk.bold(` ${req.originalUrl}`) +
				` ${statusCode} ` +
				chalk.green(res.statusMessage) +
				chalk.bold(` ${timeTken(startTime)}ms`) +
				chalk.cyan(` ${size} bytes;`)
		);
	}
}
