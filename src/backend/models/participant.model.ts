import { Schema, model } from 'mongoose';

interface Participant {
	firstName: String;
	lastName: String;
	address: String;
	city: String;
	zip: String;
	phone: String;
	email: String;
	siteNotes: String;
	lotArea: Number;
	plantableArea: Number;
	needsAssessment: Boolean;
}

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
