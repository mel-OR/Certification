import Router from 'koa-router';
import Koa from 'koa';
import * as assessmentControllers from '../controllers/assessment.controller';

const assessment = new Router({ prefix: '/assessment' });

assessment
	.get('/', async (ctx: Koa.Context) => {
		await assessmentControllers.getAssessment(ctx);
	})
	.get('/:id', async (ctx: Koa.Context) => {
		await assessmentControllers.getAssessmentById(ctx);
	})
	.post('/', async (ctx: Koa.Context) => {
		await assessmentControllers.createAssessment(ctx);
	});

export default assessment.routes();
