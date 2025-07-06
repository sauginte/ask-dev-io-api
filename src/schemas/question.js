import Joi from "joi";

const questionSchema = Joi.object({
  questionText: Joi.string().required(),
});

export default questionSchema;
