import Router from 'koa-router';
import Koa from 'koa';

const participant = new Router({ prefix: '/participant' });

participant
	.get('/', (ctx: Koa.Context) => {
		console.log('Get all participants');
		ctx.body = { participants: [ 'participants will list here' ] };
	})
	.get('/:id', (ctx: Koa.Context) => {
		const { id } = ctx.params;
		console.log(`Return user with id = ${id}`);
		ctx.body = {
			firstName: '',
			lastName: '',
			address: '',
			city: '',
			zip: '',
			phone: '',
			siteNotes: '',
			lotArea: null,
			plantableArea: null,
			needsAssessment: null
		};
	});

export default participant.routes();
