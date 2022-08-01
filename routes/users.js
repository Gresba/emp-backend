import { Router } from "express"
import * as controller from "../controllers/users.js"

const router = Router();

router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.post("/users/register", controller.register);
router.post("/users/login", controller.login);
router.get("/profile", controller.profile);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

export default router;
