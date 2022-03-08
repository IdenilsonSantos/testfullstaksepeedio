import { Router } from 'express';
import Url from '../controllers/UrlController';
import { checkToken } from '../middlewares/checkToken';

const router = Router();

router.post('/url', checkToken, Url.store);
router.get('/url', checkToken, Url.getByUser);
router.post('/url/view/:id', Url.urlViews);
router.get('/url/views/', Url.getTopViews);
router.delete('/url/del/:id', checkToken, Url.delete)

export default router;