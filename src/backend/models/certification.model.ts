import { Schema, model } from 'mongoose';
import {
	silverWeeds,
	goldWeeds,
	platinumWeeds,
	canopyLayers,
	pesticideStrategy,
	wildlifeItems,
	stormwaterManagement,
	volunteerItems
} from '../../constants';

interface Certification {
	assessmentId: String;
	certificationLevel: String;
	gardenTour: Boolean;
	weeds: {
		silver: String[];
		gold: String[];
		platinum: String[];
	};
	naturescaping: {
		canopyLayers: String[];
		naturescapedArea: Number;
		totalTrees: Number;
		totalOtherPlants: Number;
		oakscaping: Boolean;
		percentNaturescaped: Number;
	};
	pesticideReduction: String[];
	wildlifeStewardship: {
		hasCats: Boolean;
		wildlifeItems: String[];
	};
	stormwaterManagement: String[];
	outreach: {
		education: String[];
		additionalNotes: String;
	};
}

const CertificationSchema: Schema = new Schema({
	assessmentId: { type: String, required: true },
	certificationLevel: { type: String },
	gardenTour: Boolean,
	weeds: {
		silver: [ { type: String, enum: silverWeeds, required: true } ],
		gold: [ { type: String, enum: goldWeeds, required: true } ],
		platinum: [ { type: String, enum: platinumWeeds } ]
	},
	naturescaping: {
		canopyLayers: [ { type: String, enum: canopyLayers, required: true } ],
		naturescapedArea: { type: Number, required: true },
		totalTrees: { type: Number, required: true },
		totalOtherPlants: { type: Number, required: true },
		oakscaping: { type: Boolean, required: true },
		percentNaturescaped: Number
	},
	pesticideReduction: [ { type: String, enum: pesticideStrategy } ],
	wildlifeStewardship: {
		hasCats: { type: Boolean, required: true },
		wildlifeItems: [ { type: String, enum: wildlifeItems } ]
	},
	stormwaterManagement: [ { type: String, enum: stormwaterManagement } ],
	outreach: {
		education: [ { type: String, enum: volunteerItems } ],
		additionalNotes: String
	}
});

const Certification = model<Schema>('Certification', CertificationSchema);

export default Certification;
