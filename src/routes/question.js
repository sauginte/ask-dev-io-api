import express from "express";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validation.js";
import questionSchema from "../schemas/question.js";
import answerSchema from "../schemas/answer.js";

import {
  GET_ALL_QUESTIONS,
  INSERT,
  DELETE_BY_ID,
  GET_QUESTION_ANSWERS_BY_ID,
  INSERT_QUESTION_ANSWER_BY_ID,
} from "../controllers/question.js";

const router = express.Router();

router.get("/", GET_ALL_QUESTIONS);
router.post("/insert", auth, validate(questionSchema), INSERT);
router.get("/:id/answers", auth, GET_QUESTION_ANSWERS_BY_ID);
router.post(
  "/:id/answers",
  auth,
  validate(answerSchema),
  INSERT_QUESTION_ANSWER_BY_ID
);
router.delete("/:id", auth, DELETE_BY_ID);

export default router;
