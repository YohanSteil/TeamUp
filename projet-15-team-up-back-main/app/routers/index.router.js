import express from "express";
import eventsRouter from "./api/events.router.js";
import userRouter from "./api/user.router.js";
import sportRouter from "./api/sport.router.js";
import levelRouter from "./api/levels.router.js";
import contactRouter from "./api/contact.router.js";

const router = express.Router();

router.use((req, _, next) => {
  req.format = "json";
  next();
});
/**
 * Une activité
 * @typedef {object} Event
 * @property {number} id - L'identifiant unique de l'activité
 * @property {string} title.required - Le titre de l'activité
 * @property {string} date.required - La date de l'activité
 * @property {number} organizer.required - L'identifiant de l'organisateur de l'activité
 * @property {string} description - La description de l'activité
 * @property {number} number_of_participants.required - Le nombre de participants max
 * @property {string} address.required - L'adresse de l'activité
 * @property {string} start_time.required - L'heure de début de l'activité
 * @property {string} end_time.required - L'heure de fin de l'activité
 * @property {number} level_id.required - L'identifiant du niveau de l'activité
 * @property {number} sport_id.required - L'identifiant du sport de l'activité
 * @property {string} created_at - La date de création de l'activité
 * @property {string} updated_at - La date de mise à jour de l'activité
 */
router.use("/events", eventsRouter);
/**
 * Un utilisateur
 * @typedef {object} User
 * @property {number} id - L'identifiant unique de l'utilisateur
 * @property {string} first_name.required - Le prénom de l'utilisateur
 * @property {string} last_name.required - Le nom de famille de l'utilisateur
 * @property {string} username.required - Le pseudo de l'utilisateur
 * @property {string} email.required - L'adresse email de l'utilisateur
 * @property {string} date_of_birth.required - La date de naissance de l'utilisateur
 * @property {string} description - La description de l'utilisateur
 * @property {string} photo - L'URL de la photo de profil de l'utilisateur
 * @property {string} role.required - Le rôle de l'utilisateur
 * @property {string} created_at - La date de création de l'utilisateur
 * @property {string} updated_at - La date de mise à jour de l'utilisateur
 */
router.use("/user", userRouter);
/**
 * Un sport
 * @typedef {object} Sport
 * @property {number} id - L'identifiant unique du sport
 * @property {string} name.required - Le nom du sport
 * @property {string} image - L'URL de l'image représentant le sport
 * @property {string} created_at - La date de création du sport au format
 * @property {string} updated_at - La date de mise à jour du sport au format
 */
router.use("/sport", sportRouter);
/**
 * Un niveau
 * @typedef {object} Level
 * @property {number} id - L'identifiant unique du niveau
 * @property {string} name.required - Le nom du niveau
 * @property {string} created_at - La date de création du niveau au format
 * @property {string} updated_at - La date de mise à jour du niveau au format
 */
router.use("/level", levelRouter);

router.use("/contact", contactRouter);

export default router;
