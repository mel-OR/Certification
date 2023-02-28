import { createMockContext } from '@shopify/jest-koa-mocks';
import {
	silverCertificationRequestBody,
	participantResponseMock,
	silverCertificationResponseBody
} from '../../fixtures/controller.fixtures';
import { createCertification } from '../certification.controller';
import Certification from '../../models/certification.model';
import Assessment from '../../models/assessment.model';
import Participant from '../../models/participant.model';

describe('Certification controller test setup', function() {
	const ctx = createMockContext({ requestBody: silverCertificationRequestBody });

	it('Returns successfully when creating certification', async function() {
		jest.spyOn(Certification, 'findOne').mockResolvedValue(null);
		jest.spyOn(Assessment, 'findById').mockReturnValue(JSON.parse(JSON.stringify({ _id: '12345' })));
		jest.spyOn(Participant, 'findById').mockReturnValue(JSON.parse(JSON.stringify(participantResponseMock)));
		jest
			.spyOn(Certification.prototype, 'save')
			.mockReturnValue(JSON.parse(JSON.stringify(silverCertificationResponseBody)));
		await createCertification(ctx);

		expect(ctx.status).toBe(200);
		console.log(ctx.status);
		const responseBody: Certification = ctx.response.body as Certification;
		expect(responseBody.certificationLevel).toBe('SILVER');
	});
});
