import express from "express";

import {
  GET_ALL_QUESTIONS,
  INSERT,
  DELETE_BY_ID,
  GET_QUESTION_ANSWERS_BY_ID,
  INSERT_QUESTION_ANSWER_BY_ID,
} from "../controllers/question.js";

const router = express.Router();

router.get("/", GET_ALL_QUESTIONS);
router.post("/insert", INSERT);
router.get("/:id/answers", GET_QUESTION_ANSWERS_BY_ID);
router.post("/:id/answers", INSERT_QUESTION_ANSWER_BY_ID);
router.delete("/:id", DELETE_BY_ID);

export default router;
