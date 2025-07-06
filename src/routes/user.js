import express from "express";

import { INSERT_USER } from "../controllers/user.js";

const router = express.Router();

router.post("/", INSERT_USER);

export default router;
