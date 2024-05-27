import Joi from "joi";

const sportSchema = Joi.object({
  name: Joi.string().required(),
  photo: Joi.string().default(
    "https://exemple.com/lien_vers_image_par_defaut.png"
  ),
  created_at: Joi.date().timestamp("javascript").default(Date.now),
  updated_at: Joi.date().timestamp("javascript"),
});

export default sportSchema;
