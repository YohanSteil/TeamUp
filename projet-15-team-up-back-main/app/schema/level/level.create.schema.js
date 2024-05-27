import Joi from "joi";

const levelCreateSchema = Joi.object({
  name: Joi.string().required(),
  created_at: Joi.date().timestamp("javascript").default(Date.now),
  updated_at: Joi.date().timestamp("javascript"),
});

export default levelCreateSchema;
