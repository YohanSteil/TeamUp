import Joi from "joi";

const userSchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/)
    .required(), // Le mot de passe doit contenir au moins 12 caractères, 1 majuscule,
  // 1 caractère spécial et 1 chiffre.
  date_of_birth: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .optional(), // Format JJ/MM/AAAA
  description: Joi.string().optional(),
  photo: Joi.string().default("profile_photo/DEFAULT.jpg"),
  role: Joi.string().default("member"),
  created_at: Joi.date().timestamp("javascript").default(Date.now),
  updated_at: Joi.date().timestamp("javascript").optional(),
});

export default userSchema;
