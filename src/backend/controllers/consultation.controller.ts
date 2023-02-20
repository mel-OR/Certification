import Consultation from '../models/certification.model';
import Koa from 'koa';

export async function getConsultation(ctx: Koa.Context) {
	const result = await Consultation.find();
	if (result) {
		ctx.body = result;
	}
}

export async function getConsultationById(ctx: Koa.Context) {
	const result = await Consultation.findById(ctx.params.id);
	if (result) {
		ctx.body = result;
	}
}

export async function createConsultation(ctx: Koa.Context) {
	const data = <Consultation>ctx.request.body;
	const findResult = await Consultation.findOne({
		assessmentId: data.assessmentId
	});
	if (findResult) {
		ctx.body = findResult;
		console.log('Consultation already exists');
	} else {
		const result = await new Consultation(ctx.request.body).save();
		ctx.body = result;
		console.log('Create new Certification');
	}
}
