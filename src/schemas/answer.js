import Joi from "joi";

const answerSchema = Joi.object({
  answerText: Joi.string().required(),
  likeNumber: Joi.number().required(),
});

export default answerSchema;
