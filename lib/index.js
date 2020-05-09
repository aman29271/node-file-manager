const express = require('express')

const app = new express()
const { resolve } = require('path')

const Main = require('./utils/listDir')
const flatCacheMiddleware = require('./middleware/flatCache')
const resolvePathMiddleware = require('./middleware/resolvepath')

const PORT = process.env.PORT || 8080;

const dataDir = resolve(__dirname, '..', 'data');
app.use(express.static(resolve(__dirname, '../public')))
app.set('locals', dataDir);
app.get('/*', resolvePathMiddleware, flatCacheMiddleware, async (req, res) => {
    // filter the path by uuid and fetch directory location and load cache
    const mainDirr = new Main(app.get('locals'));
    let dirList = await mainDirr.listDirectory();
    const data = await Promise.all(dirList)
    res.send(data)
})
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});