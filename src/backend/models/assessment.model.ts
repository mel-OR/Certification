import { Schema, model } from 'mongoose';

interface Assessment {
	participantId: String;
	visitDate: Date;
	volunteerFName: String;
	volunteerLName: String;
	visitType: String;
}

const AssessmentSchema: Schema = new Schema({
	participantId: { type: String, required: true },
	visitDate: { type: Date, required: true },
	volunteerFName: { type: String, required: true },
	volunteerLName: { type: String, required: true },
	visitType: { type: String, enum: [ 'Consultation', 'Certification' ], required: true }
});

const Assessment = model<Schema>('Assessment', AssessmentSchema);

export default Assessment;
