import Joi from "joi";

const userSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
    .required(), // Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.
  date_of_birth: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .required(), // Format JJ/MM/AAAA
  description: Joi.string(),
  photo: Joi.string().default(
    "profile_photo/DEFAULT.jpg"
  ),
  role: Joi.string().default("member"),
  created_at: Joi.date().timestamp("javascript").default(Date.now),
  updated_at: Joi.date().timestamp("javascript"),
});

export default userSchema;
