import { createMockContext } from '@shopify/jest-koa-mocks';
import {
	silverCertificationRequestBody,
	participantResponseMock,
	silverCertificationResponseBody,
	multipleCertificationsResponseBody
} from '../../fixtures/controller.fixtures';
import { createCertification, getCertification, getCertificationById } from '../certification.controller';
import Certification from '../../models/certification.model';
import Assessment from '../../models/assessment.model';
import Participant from '../../models/participant.model';

describe('Certification controller ', function() {
	const ctx = createMockContext({ requestBody: silverCertificationRequestBody });

	it('createCertification returns successfully when creating certification', async function() {
		//Arrange
		jest.spyOn(Certification, 'findOne').mockResolvedValue(null);
		jest.spyOn(Assessment, 'findById').mockReturnValue(JSON.parse(JSON.stringify({ _id: '12345' })));
		jest.spyOn(Participant, 'findById').mockReturnValue(JSON.parse(JSON.stringify(participantResponseMock)));
		jest
			.spyOn(Certification.prototype, 'save')
			.mockReturnValue(JSON.parse(JSON.stringify(silverCertificationResponseBody)));
		//Act
		await createCertification(ctx);
		//Assert
		expect(ctx.status).toBe(200);
	});

	it('createCertification returns successfully when certification already exists', async function() {
		//Arrange
		jest
			.spyOn(Certification, 'findOne')
			.mockReturnValue(JSON.parse(JSON.stringify(silverCertificationResponseBody)));
		//Act
		await createCertification(ctx);
		//Assert
		expect(ctx.status).toBe(200);
	});

	it('getCertification returns all certification records', async function() {
		//Arrange
		jest
			.spyOn(Certification, 'find')
			.mockReturnValue(JSON.parse(JSON.stringify(multipleCertificationsResponseBody)));
		//Act
		await getCertification(ctx);
		//Assert
		expect(ctx.status).toBe(200);
		const responseBody: Certification[] = ctx.response.body as Certification[];
		expect(responseBody.length).toBe(2);
	});

	it('getCertificationById returns successfully when record exists', async function() {
		//Arrange
		jest
			.spyOn(Certification, 'findById')
			.mockReturnValue(JSON.parse(JSON.stringify(silverCertificationResponseBody)));
		//Act
		await getCertification(ctx);
		//Assert
		expect(ctx.status).toBe(200);
	});

	it('updateCertification returns successfully when updating certification', async function() {
		//Arrange
		jest.spyOn(Assessment, 'findById').mockReturnValue(JSON.parse(JSON.stringify({ _id: '12345' })));
		jest.spyOn(Participant, 'findById').mockReturnValue(JSON.parse(JSON.stringify(participantResponseMock)));
		jest
			.spyOn(Certification, 'findByIdAndUpdate')
			.mockReturnValue(JSON.parse(JSON.stringify(silverCertificationResponseBody)));
		//Act
		await createCertification(ctx);
		//Assert
		expect(ctx.status).toBe(200);
	});
});
