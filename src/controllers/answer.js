import AnswerModel from "../models/answer.js";

const DELETE_BY_ID = async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await AnswerModel.findOneAndDelete({ id: answerId });

    if (!answer) {
      return res
        .status(404)
        .json({ message: `Answer with id ${answerId} does not exist` });
    }

    return res.status(200).json({
      message: "Answer was deleted successfully",
      answer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export { DELETE_BY_ID };
