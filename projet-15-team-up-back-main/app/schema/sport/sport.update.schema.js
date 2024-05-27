import Joi from "joi";

const sportUpdateSchema = Joi.object({
  name: Joi.string(),
  image: Joi.string().default(
    "https://exemple.com/lien_vers_image_par_defaut.png"
  ),
  updated_at: Joi.date().timestamp("javascript").default(Date.now),
});

export default sportUpdateSchema;
