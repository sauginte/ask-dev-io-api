import express from "express";

import { DELETE_BY_ID } from "../controllers/answer.js";

const router = express.Router();

router.delete("/:id", DELETE_BY_ID);

export default router;
