import { Schema, model } from 'mongoose';
import {
	certificationLevel,
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
	certificationLevel: { type: String, enum: certificationLevel, required: true },
	gardenTour: Boolean,
	weeds: {
		silver: [ { type: String, enum: silverWeeds } ],
		gold: [ { type: String, enum: goldWeeds } ],
		platinum: [ { type: String, enum: platinumWeeds } ]
	},
	naturescaping: {
		canopyLayers: [ { type: String, enum: canopyLayers } ],
		naturescapedArea: { type: Number, required: true },
		totalTrees: { type: Number, required: true },
		totalOtherPlants: { type: Number, required: true },
		oakscaping: { type: Boolean, required: true },
		percentNaturescaped: Number //(round and calc from input),
	},
	pesticideReduction: [ { type: String, enum: pesticideStrategy } ], //--tricky error handling, redo or ignore certain combos?
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
