import express from "express";
import auth from "../middlewares/auth.js";

import { DELETE_BY_ID } from "../controllers/answer.js";

const router = express.Router();

router.delete("/:id", auth, DELETE_BY_ID);

export default router;
