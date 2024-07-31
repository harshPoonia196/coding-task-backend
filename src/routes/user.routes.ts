import { Router } from "express";
import { createUser, uploadExcel } from "../controllers/user.controller";

const router = Router();

router.post("/create-user", createUser);
router.post("/upload", uploadExcel);

export default router;
