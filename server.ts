import Koa, { HttpError } from 'koa';
import logger from 'koa-logger';
import router from './src/backend/routes/routes';
import bodyParser from 'koa-bodyparser';

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

export default server;
