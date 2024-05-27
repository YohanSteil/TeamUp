import Joi from "joi";
import moment from "moment";

const eventUpdateSchema = Joi.object({
  title: Joi.string().min(3),
  date: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/) // Format JJ/MM/AAAA
    .custom((value, helpers) => {
      // Vérifier si la date de l'événement est supérieure ou égale à la date actuelle
      const eventDate = moment(value, "DD/MM/YYYY");
      if (eventDate.isBefore(moment().startOf('day'))) {
        return helpers.message("La date de l'événement ne peut pas être antérieure à la date actuelle.");
      }
      return value;
    }),
  organizer: Joi.number().integer().min(1),
  description: Joi.string().allow(""),
  number_of_participants: Joi.number().integer().min(0),
  address: Joi.string(),
  start_time: Joi.string().regex(/^\d{2}h\d{2}$/), // Format HHhMM
  end_time: Joi.string().regex(/^\d{2}h\d{2}$/), // Format HHhMM
  level_id: Joi.number().integer().min(1),
  sport_id: Joi.number().integer().min(1),
  updated_at: Joi.date().timestamp("javascript").default(Date.now),
});

export default eventUpdateSchema;
