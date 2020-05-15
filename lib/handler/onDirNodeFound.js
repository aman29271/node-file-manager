const Cache = require('../utils/Cache');

const pathdb = new Cache('path', 'dirdb.json');

function dirDbHandler(truckLoadOfdata) {
	(async () => {
		await pathdb.load(truckLoadOfdata);
	})();
	// const { uuid, location } = args
	// const res = pathdb.set(uuid, {
	//     location
	// })
	// if (!res) { console.log('Directory Db Error') }
}
module.exports = dirDbHandler;
