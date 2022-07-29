import { Router } from "express";
import usersRoutes from "./users.js";
import commentsRoutes from "./comments.js";
import picturesRoutes from "./pictures.js";

const router = Router();

router.get("/", (req, res) => res.send("Root"))

router.get("/", (req, res) => res.send("Api Root"));

router.use("/", usersRoutes);
router.use("/", commentsRoutes);
router.use("/", picturesRoutes);

export default router;
