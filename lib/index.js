const express = require('express');

const app = new express();
const { resolve } = require('path');

const Main = require('./utils/Main');
// middleware
const CacheMiddleware = require('./middleware/flatCache');
const PathMiddleware = require('./middleware/resolvepath');
const loggerMiddleware = require('./middleware/requestLogger');
const isFile = require('./middleware/isFile');
// handlers
const db = require('./handler/data');
// templates
const PORT = process.env.PORT || 4000;

// const dataDir = resolve(__dirname, '..', 'data');
const dataDir = resolve('/srv/media');
app.set('views', resolve(__dirname, 'templates'));
app.set('view engine', 'jsx');
app.set('locals', dataDir);

app.use(express.static(resolve(__dirname, '../public')));
app.use(loggerMiddleware);
app.engine('jsx', require('express-react-views').createEngine());

app.get('/*', PathMiddleware, CacheMiddleware, async (req, res) => {
	req.locals ? app.set('locals', req.locals) : null;
	// filter the path by uuid and fetch directory location and load cache
	const mainDirr = new Main(app.get('locals'));
	// register handler when a directory node found
	mainDirr.on('data', db);
	// mainDirr.on('fileNodeFound', fileDbHandler);
	if (await mainDirr.isFile()) {
		isFile(req, res);
	} else {
		let dirList = await mainDirr.listDirectory();
		const data = await Promise.all(dirList);
		res.render('index', { data });
	}
});
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
// process.on('uncaughtException', (err) => {
//     console.info('Uncaught exception has occured')
//     console.error(err)
//     process.exit(1)
// })
// process.on('exit', (code) => {
//     console.warn(`Process is going to exit with code ${code}`)
// })
