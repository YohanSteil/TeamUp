import Joi from "joi";

const contactSchema = Joi.object({
  email: Joi.string().email().required(),
  subject: Joi.string().min(3).max(100).required(),
  message: Joi.string().min(5).max(1000).required(),
});

export default contactSchema;
