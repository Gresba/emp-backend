import { Router } from "express"
import * as controller from "../controllers/pictures.js"

const router = Router();

router.get("/pictures", controller.getPictures);
router.get("/pictures/:id", controller.getPicture);

export default router;
