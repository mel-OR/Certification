import Assessment from '../models/assessment.model';
import Koa from 'koa';

export async function getAssessment(ctx: Koa.Context) {
	if (ctx.query.participantId) {
		ctx.body = await Assessment.find({ participatnId: ctx.query.participantId });
	} else {
		ctx.body = await Assessment.find();
	}
}

export async function getAssessmentById(ctx: Koa.Context) {
	ctx.body = await Assessment.findById(ctx.params.id);
}

export async function createAssessment(ctx: Koa.Context) {
	const data = <Assessment>ctx.request.body;
	const findResult = await Assessment.findOne({
		participantId: data.participantId,
		assessmentDate: data.visitDate
	});
	if (findResult) {
		ctx.body = findResult;
		console.log('Assessment already exists');
	} else {
		const result = await new Assessment(ctx.request.body).save();
		ctx.body = result;
		console.log('Create new assessment');
	}
}
