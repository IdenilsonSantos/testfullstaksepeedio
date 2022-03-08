import { Router } from 'express';
import Url from '../controllers/UrlController';
import { checkToken } from '../middlewares/checkToken';

const router = Router();

router.post('/url', checkToken, Url.store);
router.get('/url', checkToken, Url.getByUser);
router.post('/url/view/:id', Url.urlViews)

export default router;