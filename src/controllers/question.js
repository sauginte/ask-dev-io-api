import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import QuestionModel from "../models/question.js";
import AnswerModel from "../models/answer.js";

const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();

    return res.status(200).json({ questions: questions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const INSERT = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newQuestion = {
      ...req.body,
      id: uuidv4(),
      userId: decoded.userId,
      createdAt: new Date(),
    };

    const response = await new QuestionModel(newQuestion);
    const data = await response.save();

    return res
      .status(201)
      .json({ message: "Question was posted successfully", question: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const GET_QUESTION_ANSWERS_BY_ID = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionModel.findOne({ id: questionId });
    const answers = await AnswerModel.find({ questionId: questionId });

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with id ${questionId} does not exist` });
    }

    res.status(200).json({ data: answers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const INSERT_QUESTION_ANSWER_BY_ID = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with id ${questionId} does not exist` });
    }

    const newAnswer = {
      ...req.body,
      id: uuidv4(),
      questionId: questionId,
      createdAt: new Date(),
    };
    const response = await new AnswerModel(newAnswer);
    const data = await response.save();

    return res
      .status(201)
      .json({ message: "Answer was posted successfully", answer: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const DELETE_BY_ID = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionModel.findOneAndDelete({ id: questionId });
    const answers = await AnswerModel.deleteMany({ questionId: questionId });

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with id ${id} does not exist` });
    }

    return res.status(200).json({
      message: "Question was deleted successfully",
      question,
      answers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export {
  GET_ALL_QUESTIONS,
  INSERT,
  DELETE_BY_ID,
  GET_QUESTION_ANSWERS_BY_ID,
  INSERT_QUESTION_ANSWER_BY_ID,
};
