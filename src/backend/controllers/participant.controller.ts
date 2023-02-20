import Participant from '../models/participant.model';
import Koa from 'koa';

export async function getParticipants(ctx: Koa.Context) {
	const result = await Participant.find();
	if (result) {
		ctx.body = result;
	}
}

export async function getParticipantById(ctx: Koa.Context) {
	const result = await Participant.findById(ctx.params.id);
	if (result) {
		ctx.body = result;
	}
}

export async function createParticipant(ctx: Koa.Context) {
	const data = <Participant>ctx.request.body;
	const findResult = await Participant.findOne({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email
	});
	if (findResult) {
		ctx.body = findResult;
		console.log('Participant already exists');
	} else {
		const result = await new Participant(ctx.request.body).save();
		ctx.body = result;
		console.log('Create new participant');
	}
}
