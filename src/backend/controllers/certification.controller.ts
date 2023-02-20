import Certification from '../models/certification.model';
import Koa from 'koa';
import Participant from '../models/participant.model';
import Assessment from '../models/assessment.model';

export async function getCertification(ctx: Koa.Context) {
	const result = await Certification.find();
	if (result) {
		ctx.body = result;
	}
}

export async function getCertificationById(ctx: Koa.Context) {
	const result = await Certification.findById(ctx.params.id);
	if (result) {
		ctx.body = result;
	}
}

export async function createCertification(ctx: Koa.Context) {
	const data = <Certification>ctx.request.body;
	const findResult = await Certification.findOne({
		assessmentId: data.assessmentId
	});
	if (findResult) {
		ctx.body = findResult;
		console.log('Certification already exists');
	} else {
		const percentNaturescaped = await calculatePercentNaturescaped(data);
		data.naturescaping.percentNaturescaped = <Number>percentNaturescaped;
		const result = await new Certification(ctx.request.body).save();
		ctx.body = result;
		console.log('Create new certification');
	}
}

async function calculatePercentNaturescaped(data: Certification) {
	const assessment = await Assessment.findById(data.assessmentId);
	if (assessment) {
		const participant = await Participant.findById(assessment.participantId);
		if (participant) {
			const percentNaturescaped = Math.round(
				data.naturescaping.naturescapedArea.valueOf() / participant.plantableArea.valueOf() * 100
			);
			return percentNaturescaped;
		}
	}
}
