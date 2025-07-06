import Joi from "joi";

const questionSchema = Joi.object({
  userId: Joi.string().required(),
  questionText: Joi.string().required(),
});

export default questionSchema;
