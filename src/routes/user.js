import express from "express";

import { SIGN_UP, LOGIN_USER } from "../controllers/user.js";

const router = express.Router();

router.post("/", SIGN_UP);
router.post("/login", LOGIN_USER);

export default router;
