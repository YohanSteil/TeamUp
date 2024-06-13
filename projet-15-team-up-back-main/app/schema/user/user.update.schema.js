import Joi from "joi";

const userUpdateSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/)
    .min(12), // Le mot de passe doit contenir au moins 12 caractères,
  //            1 majuscule, 1 caractère spécial et 1 chiffre.
  date_of_birth: Joi.date(),
  description: Joi.string(),
  photo: Joi.string().default(
    "https://exemple.com/lien_vers_image_par_defaut.png"
  ),
  role: Joi.string().valid('admin', 'member') // Ajout du champ "role" avec validation
    .default('member'),
  updated_at: Joi.date().timestamp("javascript").default(Date.now),
});

export default userUpdateSchema;
