import { Schema, model } from 'mongoose';

const ParticipantSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	zip: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	siteNotes: { type: String },
	lotArea: { type: Number },
	plantableArea: { type: Number },
	needsAssessment: { type: Boolean }
});

const Participant = model<Schema>('Participant', ParticipantSchema);

export default Participant;
