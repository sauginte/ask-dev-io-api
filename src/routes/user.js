import express from "express";
import validate from "../middlewares/validation.js";
import userLoginSchema from "../schemas/user.js";
import auth from "../middlewares/auth.js";

import { SIGN_UP, LOGIN_USER, GET_USER_ID } from "../controllers/user.js";

const router = express.Router();

router.post("/", SIGN_UP);
router.post("/login", validate(userLoginSchema), LOGIN_USER);
router.get("/", auth, GET_USER_ID);

export default router;
