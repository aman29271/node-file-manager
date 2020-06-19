const Cache = require('../utils/Cache');

const pathdb = new Cache('path', 'dirdb.json');

function dirDbHandler(truckLoadOfdata) {
	(async () => {
		await pathdb.load(truckLoadOfdata);
	})();
}
module.exports = dirDbHandler;
