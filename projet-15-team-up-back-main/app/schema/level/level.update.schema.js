import Joi from "joi";

const levelUpdateSchema = Joi.object({
  name: Joi.string(),
  updated_at: Joi.date().timestamp("javascript").default(Date.now),
});

export default levelUpdateSchema;
