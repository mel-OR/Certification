import participant from './participant';
import assessment from './assessment';
import Router from 'koa-router';

const router = new Router();
router.use(participant);
router.use(assessment);

export default router;
