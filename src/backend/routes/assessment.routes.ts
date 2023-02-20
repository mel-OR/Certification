import Router from 'koa-router';
import Koa from 'koa';
import * as assessmentControllers from '../controllers/assessment.controller';

const assessment = new Router({ prefix: '/assessment' });

assessment
	.get('/', async (ctx: Koa.Context) => {
		assessmentControllers.getAssessment(ctx);
	})
	.get('/:id', async (ctx: Koa.Context) => {
		assessmentControllers.getAssessmentById(ctx);
	})
	.post('/', async (ctx: Koa.Context) => {
		assessmentControllers.createAssessment(ctx);
	});

export default assessment.routes();
