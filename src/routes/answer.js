import express from "express";
import auth from "../middlewares/auth.js";

import { DELETE_BY_ID, UPDATE_ANSWER_BY_ID } from "../controllers/answer.js";

const router = express.Router();

router.delete("/:id", auth, DELETE_BY_ID);
router.patch("/:id", auth, UPDATE_ANSWER_BY_ID);

export default router;
