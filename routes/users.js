import { Router } from "express"
import * as controller from "../controllers/users.js"

const router = Router();

router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.get("/users/email/:email", controller.getUserByEmail);
router.post("/users", controller.createUser);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

export default router;
