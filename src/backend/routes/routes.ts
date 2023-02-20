import participant from './participant.routes';
import assessment from './assessment.routes';
import certification from './certification.routes';
//import consultation from './consultation.routes';
import Router from 'koa-router';

const router = new Router();
router.use(participant);
router.use(assessment);
router.use(certification);
export default router;
