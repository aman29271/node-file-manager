const express = require('express');
const http = require('http');
const app = new express();
const path = require('path');

const server = http.createServer(app);
let PORT = process.env.PORT || 4000;

const { resolve } = require('path');

const Main = require('./utils/Main');
// middleware
const CacheMiddleware = require('./middleware/flatCache');
const PathMiddleware = require('./middleware/resolvepath');
const loggerMiddleware = require('./middleware/requestLogger');
const isFile = require('./middleware/isFile');
const api = require('./api');
// handlers
const db = require('./handler/data');
// templates
const parentListing = require('./utils/getParent');
// const dataDir = resolve(__dirname, '..', 'data');
const dataDir = resolve('/home/phoenix/Pictures/.env');
app.disable('x-powered-by');
// local overrides
app.set('views', resolve(__dirname, 'templates'));
app.set('view engine', 'jsx');
app.set('root', dataDir);
app.set('locals', dataDir);
// template engine
app.engine('jsx', require('express-react-views').createEngine());
// routers
app.use(loggerMiddleware);
app.use('/static', express.static(resolve(__dirname, '../public')));
app.use('/static', express.static(resolve(path.dirname(require.resolve('bulma')), './css')));
app.use('/v1/api', api);
app.use(PathMiddleware);

app.get('/*', CacheMiddleware, async (req, res) => {
	req.locals ? app.set('locals', req.locals) : null;
	// filter the path by uuid and fetch directory location and load cache
	const mainDirr = new Main(app.get('locals'));
	mainDirr.on('data', db);
	app.set('locals', dataDir);
	if (await mainDirr.isFile()) {
		await isFile(req, res);
	} else {
		let data = {};
		data.files = await mainDirr.listDirectory();
		data.parentList = await parentListing(mainDirr.dir, app.get('root'));
		data.pathname = path.resolve(app.get('root'));
		data.currentDir = path.basename(mainDirr.dir);
		data.currURL = req.url || req.originalUrl;
		res.render('index', { data });
	}
});
server.listen(PORT, backlog);

function backlog() {
	console.info(`Server is running on PORT ${PORT}`);
}
server.on('error', (err) => {
	if (err.code === 'EADDRINUSE') {
		console.info('PORT %d in use. switching...', PORT);
		setTimeout(() => {
			// cleanup
			// remove listening listeners
			server.removeListener('listening', backlog);
			server.close(() => {
				PORT++;
				server.listen(PORT, backlog);
			});
		}, 1000);
	} else throw err;
});
