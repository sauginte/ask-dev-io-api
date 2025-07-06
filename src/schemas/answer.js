import Joi from "joi";

const answerSchema = Joi.object({
  userId: Joi.string().required(),
  answerText: Joi.string().required(),
  likeNumber: Joi.number().required(),
});

export default answerSchema;
