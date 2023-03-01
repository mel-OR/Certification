import Certification from '../models/certification.model';
import Koa from 'koa';
import Participant from '../models/participant.model';
import Assessment from '../models/assessment.model';
import { certificationLevels } from '../../constants';

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
		//to-do: make sure valid assessment record exists before creating certification based on the assessmentId
		//In the meantime, can update the Certification record if the assessmentId is incorrect
		const percentNaturescaped = await calculatePercentNaturescaped(data);
		data.naturescaping.percentNaturescaped = <Number>percentNaturescaped;
		const certificationLevel = calculateCertificationLevel(data);
		data.certificationLevel = <String>certificationLevel!;
		const result = await new Certification(ctx.request.body).save();
		ctx.body = result;
		console.log('Create new certification');
	}
}
export async function updateCertification(ctx: Koa.Context) {
	const data = <Certification>ctx.request.body;
	const percentNaturescaped = await calculatePercentNaturescaped(data);
	data.naturescaping.percentNaturescaped = <Number>percentNaturescaped;
	const certificationLevel = calculateCertificationLevel(data);
	data.certificationLevel = <String>certificationLevel!;
	const result = await Certification.findByIdAndUpdate(ctx.params.id, data);
	ctx.body = result;
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
		} else return 0;
	}
}

function calculateWeeds(data: Certification) {
	if (data.weeds.silver.length > 0) {
		return certificationLevels.NONE;
	}
	if (data.weeds.gold.length > 0) {
		return certificationLevels.SILVER;
	}
	if (data.weeds.platinum.length > 0) {
		return certificationLevels.GOLD;
	} else return certificationLevels.PLATINUM;
}

function calculateNaturescaping(percentNaturescaped: Number) {
	if (percentNaturescaped < 0.05) {
		return certificationLevels.NONE;
	}
	if (percentNaturescaped >= 0.05 && percentNaturescaped < 0.15) {
		return certificationLevels.SILVER;
	}
	if (percentNaturescaped >= 0.15 && percentNaturescaped < 0.5) {
		return certificationLevels.GOLD;
	}
	if (percentNaturescaped > 0.5) {
		return certificationLevels.PLATINUM;
	} else return certificationLevels.NONE;
}

function calcuateCanopyLayers(data: Certification) {
	if (data.naturescaping.canopyLayers.length < 3) {
		return certificationLevels.NONE;
	}
	if (data.naturescaping.canopyLayers.length == 3) {
		return certificationLevels.SILVER;
	}
	if (data.naturescaping.canopyLayers.length == 4) {
		return certificationLevels.GOLD;
	}
	if (data.naturescaping.canopyLayers.length == 5) {
		return certificationLevels.PLATINUM;
	} else return certificationLevels.NONE;
}

function calculatePesticideReduction(data: Certification) {
	if (data.pesticideReduction.length < 2) {
		return certificationLevels.NONE;
	}
	var ipm = false;
	var no_red = false;
	var no_yellow = false;
	var metro_pledge = false;
	if (data.pesticideReduction.length > 1) {
		data.pesticideReduction.map((item) => {
			if (item == 'IPM') {
				ipm = true;
			}
			if (item == 'no-red') {
				no_red = true;
			}
			if (item == 'no-yellow') {
				no_yellow = true;
			}
			if (item == 'metro-pledge') {
				metro_pledge = true;
			}
		});
		if (!no_yellow && ipm && no_red) {
			return certificationLevels.SILVER;
		}
		if (no_yellow && ipm && no_red && !metro_pledge) {
			return certificationLevels.GOLD;
		}
		if (no_yellow && ipm && no_red && metro_pledge) {
			return certificationLevels.PLATINUM;
		}
	} else return certificationLevels.NONE;
}

function calculateWildlifeStewardship(data: Certification) {
	if (data.wildlifeStewardship.wildlifeItems.length == 0) {
		return certificationLevels.NONE;
	}
	if (data.wildlifeStewardship.wildlifeItems.length == 1) {
		return certificationLevels.SILVER;
	}
	if (data.wildlifeStewardship.wildlifeItems.length == 2) {
		return certificationLevels.GOLD;
	} else return certificationLevels.PLATINUM;
}

function calculateStormwaterManagement(data: Certification) {
	if (data.stormwaterManagement.length == 0) {
		return certificationLevels.NONE;
	}
	if (data.stormwaterManagement.length == 1) {
		return certificationLevels.SILVER;
	}
	if (data.stormwaterManagement.length == 2) {
		return certificationLevels.GOLD;
	} else return certificationLevels.PLATINUM;
}

function calculateOutreach(data: Certification) {
	if (data.outreach.education.length == 2) {
		return certificationLevels.PLATINUM;
	}
}

function calculateCertificationLevel(data: Certification) {
	const certificationScores = {
		weedsLevel: calculateWeeds(data),
		naturescapingLevel: calculateNaturescaping(data.naturescaping.percentNaturescaped),
		canopyLayers: calcuateCanopyLayers(data),
		pesticideReduction: calculatePesticideReduction(data),
		wildlifeStewardship: calculateWildlifeStewardship(data),
		stormWaterManagement: calculateStormwaterManagement(data)
	};
	const outreach = calculateOutreach(data);

	//outreach is only required for Platinum overall certification level
	if (
		certificationScores.weedsLevel == certificationLevels.PLATINUM &&
		certificationScores.naturescapingLevel == certificationLevels.PLATINUM &&
		certificationScores.canopyLayers == certificationLevels.PLATINUM &&
		certificationScores.pesticideReduction == certificationLevels.PLATINUM &&
		certificationScores.wildlifeStewardship == certificationLevels.PLATINUM &&
		certificationScores.stormWaterManagement == certificationLevels.PLATINUM &&
		outreach == certificationLevels.PLATINUM
	) {
		return certificationLevels[certificationLevels.PLATINUM];
	}
	if (outreach != certificationLevels.PLATINUM) {
		var score = certificationLevels.GOLD;

		for (const [ key, currentScore ] of Object.entries(certificationScores)) {
			if (currentScore!.valueOf() < score.valueOf()) {
				score = currentScore!;
			}
		}
		console.log('certification score ' + certificationLevels[score]);
		return certificationLevels[score];
	}
}
