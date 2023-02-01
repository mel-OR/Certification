import Koa from 'koa';
import logger from 'koa-logger';
import router from './src/backend/routes/routes';

const PORT = '5596';

const server = new Koa();

server.use(router.routes());
server.use(router.allowedMethods);
server.use(logger());
server.listen(PORT, () => {
	console.log('The server is running at http://localhost:' + PORT);
});
