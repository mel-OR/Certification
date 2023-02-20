import Router from 'koa-router';
import Koa from 'koa';
import * as participantControllers from '../controllers/participant.controller';

const participant = new Router({ prefix: '/participant' });

participant
	.get('/', async (ctx: Koa.Context) => {
		console.log('Get all participants');
		await participantControllers.getParticipants(ctx);
	})
	.get('/:id', async (ctx: Koa.Context) => {
		console.log(`Return user with id = ${ctx.params.id}`);
		await participantControllers.getParticipantById(ctx);
	})
	.post('/', async (ctx: Koa.Context) => {
		await participantControllers.createParticipant(ctx);
	});

export default participant.routes();
