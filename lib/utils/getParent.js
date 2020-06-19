const Cache = require('./Cache');
const path = require('path');
// load directory db
const parentDb = new Cache('path', 'dirdb.json');

async function getParentList(dirname, root) {
	const parents = [];
	const data = await parentDb.loadAll();
	let intermediateParent;
	intermediateParent = dirname;
	while (intermediateParent !== root) {
		intermediateParent = path.dirname(dirname);
		const matchData = data.find((ele) => ele.location === intermediateParent);
		if (matchData) {
			matchData.name = path.basename(matchData.location);
			parents.push(matchData);
		}
	}
	return parents;
}
module.exports = getParentList;
