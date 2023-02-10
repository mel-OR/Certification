import Router from 'koa-router';
import Koa from 'koa';
import Participant from '../models/participant.models';

const participant = new Router({ prefix: '/participant' });

participant
	.get('/', async (ctx: Koa.Context) => {
		console.log('Get all participants');
		const result = await Participant.find();
		if (result) {
			ctx.body = result;
		}
	})
	.get('/:id', async (ctx: Koa.Context) => {
		console.log(`Return user with id = ${ctx.params.id}`);
		const result = await Participant.findById(ctx.params.id);
		if (result) {
			ctx.body = result;
		}
	})
	.post('/', async (ctx: Koa.Context) => {
		const result = await new Participant(ctx.request.body).save();
		ctx.body = result;
	});

export default participant.routes();
