export const silverCertificationRequestBody = {
	assessmentId: '63f52add7e5bb4a517f19aaa',
	gardenTour: false,
	weeds: {
		silver: [],
		gold: [],
		platinum: []
	},
	naturescaping: {
		canopyLayers: [ 'ground cover', 'small-medium shrub', 'large shrub' ],
		naturescapedArea: 450,
		totalTrees: 3,
		totalOtherPlants: 40,
		oakscaping: false
	},
	pesticideReduction: [ 'IPM', 'no-red' ],
	wildlifeStewardship: {
		hasCats: false,
		wildlifeItems: [ 'nurse log', 'insect nesting', 'water' ]
	},
	stormwaterManagement: [ 'restore soil', 'remove surfaces', 'eco-maintenance' ],
	outreach: {
		education: [],
		additionalNotes: null
	}
};

export const silverCertificationResponseBody = {
	assessmentId: '63f52add7e5bb4a517f19aaa',
	certificationLevel: 'SILVER',
	gardenTour: false,
	weeds: {
		silver: [],
		gold: [],
		platinum: []
	},
	naturescaping: {
		canopyLayers: [ 'ground cover', 'small-medium shrub', 'large shrub' ],
		naturescapedArea: 450,
		totalTrees: 3,
		totalOtherPlants: 40,
		oakscaping: false
	},
	pesticideReduction: [ 'IPM', 'no-red' ],
	wildlifeStewardship: {
		hasCats: false,
		wildlifeItems: [ 'nurse log', 'insect nesting', 'water' ]
	},
	stormwaterManagement: [ 'restore soil', 'remove surfaces', 'eco-maintenance' ],
	outreach: {
		education: [],
		additionalNotes: null
	}
};

export const participantResponseMock = { plantableArea: 2500 };
