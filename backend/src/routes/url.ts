import { Router } from "express";
import Url from "../controllers/UrlController";
import UrlUserController from "../controllers/UrlUserController";
import { checkToken } from "../middlewares/checkToken";

const router = Router();

router.post("/url", checkToken, Url.store);
router.get("/:hash", Url.redirect);
router.put("/url/view/:id", Url.urlViews);
router.get("/url/view/", Url.getTopViews);

// Url User
router.get("/url/user", checkToken, UrlUserController.getByUser);
router.delete("/url/del/:id", checkToken, UrlUserController.delete);
router.put("/url/user/favorite/:id", checkToken, UrlUserController.urlFavorite);

export default router;
