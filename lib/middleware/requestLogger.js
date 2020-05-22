const { token } = require('gen-uid');
const chalk = require('chalk');

module.exports = (req, res, next) => {
	const tokenAssigned = token(true).substr(0, 8);
	const startTime = process.hrtime();
	req.requestId = tokenAssigned;
	res.requestId = tokenAssigned;

	const getLoggerForStatusCode = (statusCode) => {
		if (statusCode >= 500) {
			return console.error.bind(console);
		}
		if (statusCode >= 400) {
			return console.warn.bind(console);
		}

		return console.log.bind(console);
	};
	function cleanupFn() {
		res.removeListener('error', errorFn);
		res.removeListener('finish', logFn);
		res.removeListener('close', abortFn);
	}
	function logFn() {
		cleanupFn();
		const logger = getLoggerForStatusCode(res.statusCode);
		const size = res.get('Content-Length') || res.contentSize || 0;
		const statusCode =
			res.statusCode === 200 || res.statusCode === 304
				? chalk.green(res.statusCode)
				: chalk.red(res.statusCode);
		const reqId = chalk.magenta(req.requestId);
		console.info(
			`[${reqId}]` +
				chalk.yellow(` ${req.method}`) +
				chalk.bold(` ${req.originalUrl}`) +
				` ${statusCode} ` +
				chalk.green(res.statusMessage) +
				chalk.bold(` ${timeTken(startTime)}ms`) +
				chalk.cyan(` ${size} bytes;`)
		);
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
	function pipeFn(src) {
		console.dir(src);
		console.log(`Event pipe headers sent:${res.headersSent}`);
	}
	// res.on('pipe', pipeFn);
	res.on('finish', logFn);
	res.on('error', errorFn);
	res.on('close', abortFn);
	next();
};
