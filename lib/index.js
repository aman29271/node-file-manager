const express = require('express')

const app = new express()
const { resolve } = require('path')
let { createReadStream } = require('fs')

const Main = require('./utils/Main')
// middleware
const CacheMiddleware = require('./middleware/flatCache')
const PathMiddleware = require('./middleware/resolvepath')
// handlers
const db = require('./handler/data')
// templates
const PORT = process.env.PORT || 8080;

const dataDir = resolve(__dirname, '..', 'data');
app.use(express.static(resolve(__dirname, '../public')))
app.set('views', resolve(__dirname, 'templates'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.set('locals', dataDir);
app.get('/*', PathMiddleware, CacheMiddleware, async (req, res) => {
    req.locals ? app.set('locals', req.locals) : null;
    // filter the path by uuid and fetch directory location and load cache
    const mainDirr = new Main(app.get('locals'));
    // register handler when a directory node found
    mainDirr.on('data', db)
    // mainDirr.on('fileNodeFound', fileDbHandler);
    if (await mainDirr.isFile()) {
        const rstream = createReadStream(req.locals)
        rstream.on('open', () => {
            rstream.pipe(res)
        })
        rstream.on('error', (err) => {
            res.send(err)
        })
    } else {
        let dirList = await mainDirr.listDirectory();
        const data = await Promise.all(dirList)
        res.render('index', { data })
    }

})
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});