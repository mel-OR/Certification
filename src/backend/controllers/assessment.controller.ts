import Assessment from '../models/assessment.model';
import Koa from 'koa';

export async function getAssessment(ctx: Koa.Context) {
	var result;
	console.log(ctx.query);
	if (ctx.query.participantId) {
		result = await Assessment.find({ participatnId: ctx.query.participantId });
		ctx.body = result;
	} else {
		console.log("Get all participants' assessments");
		result = await Assessment.find();
		ctx.body = result;
	}
}

export async function getAssessmentById(ctx: Koa.Context) {
	const result = await Assessment.findById(ctx.params.id);
	if (result) {
		ctx.body = result;
	}
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
