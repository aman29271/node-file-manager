const nodeCache = require('node-cache')

class Cache {
    constructor(time) {
        this.cache = new nodeCache({ stdTTL: time, checkperiod: time * .2, useClones: false })
    }
    get(key) {
        return this.cache.get(key)
    }
    set(key, value, time = 0) {
        return this.cache.set(key, value, time)
    }
}
module.exports = Cache