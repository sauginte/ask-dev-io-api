import express from "express";
import validate from "../middlewares/validation.js";
import userLoginSchema from "../schemas/user.js";

import { SIGN_UP, LOGIN_USER } from "../controllers/user.js";

const router = express.Router();

router.post("/", SIGN_UP);
router.post("/login", validate(userLoginSchema), LOGIN_USER);

export default router;
