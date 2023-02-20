import { Schema, model } from 'mongoose';

interface Consultation {
	assessmentId: String;
	format: String;
	certificationPriorities: String;
	certificationResources: String;
	additionalNotes: String;
}

const ConsultationSchema: Schema = new Schema({
	assessmentId: { type: String, required: true },
	format: { type: String, enum: [ 'phone', 'video', 'email', 'in-person' ], required: true },
	certificationPriorities: { type: String },
	certificationResources: { type: String },
	additionalNotes: { type: String }
});

const Consultation = model<Schema>('Consultation', ConsultationSchema);

export default Consultation;
