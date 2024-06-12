import Joi from "joi";
import moment from "moment";

const eventSchema = Joi.object({
  title: Joi.string().min(3),
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required() // Format AAAA-MM-JJ
    .custom((value, helpers) => {
      // Vérifier si la date de l'événement est supérieure ou égale à la date actuelle
      const eventDate = moment(value);
      if (eventDate.isBefore(moment().startOf("day"))) {
        return helpers.message(
          "La date de l'événement ne peut pas être antérieure à la date actuelle."
        );
      }
      return value;
    }),
  organizer: Joi.number().integer().min(1).required(),
  description: Joi.string().allow("").optional(), // allow '' : possiblité de laisser la chaine vide.
  number_of_participants: Joi.number().integer().min(0).required(),
  address: Joi.string().required(),
  start_time: Joi.string()
    .regex(/^\d{2}h\d{2}$/)
    .required(), // Format HHhMM
  end_time: Joi.string()
    .regex(/^\d{2}h\d{2}$/)
    .required(), // Format HHhMM
  level_id: Joi.number().integer().min(1).required(),
  sport_id: Joi.number().integer().min(1).required(),
  address_lat: Joi.number().required(),
  address_lng: Joi.number().required(),
  created_at: Joi.date().timestamp("javascript").default(Date.now),
  updated_at: Joi.date().timestamp("javascript"),
});

export default eventSchema;
