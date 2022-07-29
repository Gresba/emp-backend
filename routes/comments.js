import { Router } from "express"
import * as controller from "../controllers/comments.js"

const router = Router();

router.get("/comments", controller.getComments);
router.get("/comments/:id", controller.getComment);
router.post("/comments", controller.createComment);
router.put("/comments/:id", controller.updateComment);
router.delete("/comments/:id", controller.deleteComment);

export default router;

