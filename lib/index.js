const express = require('express');
const http = require('http');
const app = new express();

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

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

const dataDir = resolve(__dirname, '..', 'data');
app.set('views', resolve(__dirname, 'templates'));
app.set('view engine', 'jsx');
app.set('locals', dataDir);

app.use(loggerMiddleware);
app.use(express.static(resolve(__dirname, '../public')));
app.engine('jsx', require('express-react-views').createEngine());

app.get('/*', PathMiddleware, CacheMiddleware, async (req, res) => {
	req.locals ? app.set('locals', req.locals) : null;
	// filter the path by uuid and fetch directory location and load cache
	const mainDirr = new Main(app.get('locals'));
	// register handler when a directory node found
	mainDirr.on('data', db);
	// mainDirr.on('fileNodeFound', fileDbHandler);
	if (await mainDirr.isFile()) {
		await isFile(req, res);
	} else {
		let dirList = await mainDirr.listDirectory();
		const data = await Promise.all(dirList);
		res.render('index', { data });
	}
});
server.listen(PORT, () => {
	console.info(`Server is running on PORT ${PORT}`);
});
