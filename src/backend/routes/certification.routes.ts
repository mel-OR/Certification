import Router from 'koa-router';
import Koa from 'koa';
import * as certificationControllers from '../controllers/certification.controller';

const certification = new Router({ prefix: '/certification' });

certification
	.get('/', async (ctx: Koa.Context) => {
		await certificationControllers.getCertification(ctx);
	})
	.get('/:id', async (ctx: Koa.Context) => {
		await certificationControllers.getCertificationById(ctx);
	})
	.post('/', async (ctx: Koa.Context) => {
		await certificationControllers.createCertification(ctx);
	})
	.put('/:id', async (ctx: Koa.Context) => {
		await certificationControllers.updateCertification(ctx);
	});

export default certification.routes();
