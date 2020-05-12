const Cache = require('../utils/Cache')

const pathdb = new Cache('path', 'filedb.json')

function fileDbHandler(args) {
    (async () => {
        await pathdb.load(args)
    })()

}
module.exports = fileDbHandler