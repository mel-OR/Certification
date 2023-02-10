import Koa, { HttpError } from 'koa';
import logger from 'koa-logger';
import router from './src/backend/routes/routes';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

async function runMongoose() {
	await mongoose.connect('mongodb://localhost:27017/test').then(() => {
		console.log('******Database is connected******');
	});
}

const PORT = '5596';

const server = new Koa();

server
	.use(bodyParser({ enableTypes: [ 'json' ], jsonLimit: '100mb' }))
	.use(router.routes())
	.use(router.allowedMethods)
	.use(logger())
	.use(async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			if (err instanceof HttpError) {
				ctx.status = err.status || 500;
				ctx.body = err.message;
				ctx.app.emit('error', err, ctx);
			}
		}
	});
server.listen(PORT, () => {
	console.log('The server is running at http://localhost:' + PORT);
	console.log('Waiting for database to start...');
});
runMongoose().catch((err) => console.log(err));
