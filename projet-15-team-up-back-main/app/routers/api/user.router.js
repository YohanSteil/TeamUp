/* eslint comma-dangle: ["error", "never"] */

import express from "express";
import Controller from "../../controllers/user.controller.js";
import createSchema from "../../schema/user/user.create.schema.js";
import wrapper from "../../middlewares/controller.wrapper.js";
import updateSchema from "../../schema/user/user.update.schema.js";
import validationMiddleware from "../../middlewares/validationJoi.middleware.js";
import { verifyToken } from "../../middlewares/jwt.middleware.js";

const router = express.Router();

router
  .route("/")
  /**
   * GET /user
   * @summary Récupération de tous les utilisateurs
   * @tags User
   * @return {array<User>} 200 - La liste de tous les utilisateurs
   * @return {ApiError} 500 - Erreur interne du serveur
   * @example response - 200 - Exemple de réponse réussie
   *  {
   *    "data": [
   *      {
   *        "id": 1,
   *        "first_name": "John",
   *        "last_name": "Doe",
   *        "username": "john.doe",
   *        "email": "john@exmple.com",
   *        "date_of_birth": "1989-12-31T23:00:00.000Z",
   *        "description": "Je suis une description très marrante",
   *        "photo": "lien_vers_photo_john_doe.png",
   *        "created_at": "2024-04-17T09:58:40.143Z",
   *        "updated_at": "2024-04-17T09:58:40.143Z",
   *        "role": "member"
   *      }
   *    ]
   *  }
   * @example response - 500 - Erreur interne au serveur
   * {
   *  "statut": 500,
   *  "message": "Erreur lors de la récupération des users"
   * }
   */
  .get(wrapper(Controller.getAll.bind(Controller)))
  /**
   * POST /user
   * @summary Crée un nouvel utilisateur.
   * @tags User
   * @param {object} request.body.required - Les informations de l'utilisateur à créer
   * @returns {User} 201 - L'utilisateur créé avec succès
   * @returns {ApiError} 400 - Email invalide
   * @returns {ApiError} 409 - L'email existe déjà
   * @returns {ApiError} 409 - Username existe déjà
   * @returns {ApiError} 500 - Erreur interne du serveur
   * @example request - Exemple de corps de requête
   * {
   *   "first_name": "John",
   *   "last_name": "Doe",
   *   "username": "johndoe",
   *   "email": "john@exmple.com",
   *   "password": "secret123",
   *   "date_of_birth": "10/12/1988"
   * }
   * @example response - 201 - Exemple de réponse réussie
   *     {
   *       "data": [
   *        {
   *          "id": 1,
   *          "first_name": "John",
   *          "last_name": "Doe",
   *          "username": "john.doe",
   *          "email": "john@exmple.com",
   *          "date_of_birth": "1989-12-31T23:00:00.000Z",
   *          "description": "Je suis une description très marrante",
   *          "photo": "lien_vers_photo_john_doe.png",
   *          "created_at": "2024-04-17T09:58:40.143Z",
   *          "updated_at": "2024-04-17T09:58:40.143Z",
   *          "role": "member"
   *        }
   *       ]
   *     }
   * @example response - 400 - Email invalide
   * {
   *  "statut": 400,
   *  "message": "L'email n'est pas valide."
   * }
   * @example response - 409 - L'email existe déjà
   * {
   *  "statut": 409,
   *  "message": "L'adresse email est déjà utilisée."
   * }
   * @example response - 409 - Username existe déjà
   * {
   *  "statut": 409,
   *  "message": "Pseudonyme déjà utilisé."
   * }
   * @example response - 500 - Erreur interne au serveur
   * {
   *  "statut": 500,
   *  "message": "Une erreur est survenue lors de la création de l'utilisateur."
   * }
   */
  .post(
    validationMiddleware(createSchema, "body"),
    wrapper(Controller.createUser.bind(Controller))
  );

router
  .route("/myProfile")
  // GET USER (Protected by JTW)
  /**
   * GET /myProfile
   * @summary Récupère les informations du profil de l'utilisateur connecté.
   * @tags User
   * @security BearerAuth
   * @returns {object} 200 - Les informations du profil de l'utilisateur
   * @returns {ApiError} 404 - Utilisateur non trouvé
   * @returns {ApiError} 500 - Erreur interne du serveur
   * @example response - 200 - Exemple de réponse réussie
   * {
   *   "data": {
   *     "id": 30,
   *     "first_name": "Paris",
   *     "last_name": "Icicestparis",
   *     "username": "Luluuu6",
   *     "email": "test.test@gmail.com",
   *     "date_of_birth": "1990-10-15T23:00:00.000Z",
   *     "description": "",
   *     "photo": "https://exemple.com/lien_vers_image_par_defaut.png",
   *     "created_at": "2024-04-18T21:40:43.001Z",
   *     "updated_at": "2024-04-18T21:40:43.001Z",
   *     "role": "membre"
   *   }
   * }
   * @example response - 404 - Utilisateur non trouvé
   * {
   *   "statut": 404,
   *   "message": "Profil non trouvé"
   * }
   * @example response - 500 - Erreur interne au serveur
   * {
   *   "statut": 500,
   *   "message": "Une erreur est survenue lors de la recherche du profil."
   * }
   */
  .get(verifyToken, wrapper(Controller.getOneUser.bind(Controller)))

// UPDATE USER (Protected by JTW)
  /**
   * PATCH /myProfile
   * @summary Met à jour les informations du profil de l'utilisateur connecté.
   * @tags User
   * @security BearerAuth
   * @param {object} request.body.required - Les informations mises à jour de l'utilisateur
   * @returns {object} 200 - Les informations mises à jour du profil de l'utilisateur
   * @returns {ApiError} 400 - Données de mise à jour invalides
   * @returns {ApiError} 404 - Utilisateur non trouvé
   * @returns {ApiError} 500 - Erreur interne du serveur
   * @example request - Exemple de corps de requête
   * {
   *   "first_name": "Nouveau prénom",
   *   "last_name": "Nouveau nom",
   *   "username": "nouveau_pseudo",
   *   "email": "nouveau_email@exmple.com",
   *   "password": "NouveauMotDePasse123",
   *   "date_of_birth": "1990-10-15",
   *   "description": "Nouvelle description",
   *   "photo": "https://exemple.com/lien_vers_nouvelle_image.png",
   *   "role": "admin"
   * }
   * @example response - 200 - Exemple de réponse réussie
   * {
   *   "data": {
   *     "id": 30,
   *     "first_name": "Nouveau prénom",
   *     "last_name": "Nouveau nom",
   *     "username": "nouveau_pseudo",
   *     "email": "nouveau_email@exmple.com",
   *     "date_of_birth": "1990-10-15T00:00:00.000Z",
   *     "description": "Nouvelle description",
   *     "photo": "https://exemple.com/lien_vers_nouvelle_image.png",
   *     "created_at": "2024-04-18T21:40:43.001Z",
   *     "updated_at": "2024-04-18T21:40:43.001Z",
   *     "role": "admin"
   *   }
   * }
   * @example response - 400 - Données de mise à jour invalides
   * {
   *   "statut": 400,
   *   "message": "Les données de mise à jour sont invalides."
   * }
   * @example response - 404 - Utilisateur non trouvé
   * {
   *   "statut": 404,
   *   "message": "Profil non trouvé"
   * }
   * @example response - 500 - Erreur interne au serveur
   * {
   *   "statut": 500,
   *   "message": "Une erreur est survenue lors de la mise à jour du profil."
   * }
   */
  .patch(
    verifyToken,
    validationMiddleware(updateSchema, "body"),
    wrapper(Controller.updateUser.bind(Controller))
  )

// ROUTE DELETE USER (Protected by JTW)
  /**
   * DELETE /myProfile
   * @summary Supprime le profil de l'utilisateur connecté.
   * @tags User
   * @security BearerAuth
   * @returns {object} 204 - Profil utilisateur supprimé avec succès
   * @returns {ApiError} 404 - Utilisateur non trouvé
   * @returns {ApiError} 500 - Erreur interne du serveur
   * @example response - 404 - Utilisateur non trouvé
   * {
   *   "statut": 404,
   *   "message": "User not found"
   * }
   * @example response - 500 - Erreur interne au serveur
   * {
   *   "statut": 500,
   *   "message": "Une erreur est survenue lors de la suppression du profil."
   * }
   */
  .delete(verifyToken, wrapper(Controller.deleteUser.bind(Controller)));

router
  .route("/:id(\\d+)/lastEventCreate")
  /**
   * GET /{id}/lastEventCreate
   * @summary Affiche les 5 derniers événements créés par un utilisateur spécifique.
   * @tags User
   * @param {integer} id.path.required - L'ID de l'utilisateur
   * @returns {object} 200 - Les 5 derniers événements créés par l'utilisateur
   * @returns {ApiError} 500 - Erreur interne du serveur
   * @example response - 200 - Exemple de réponse réussie
   * {
   *   "data": [
   *     {
   *       "event_title": "Titre de l'événement",
   *       "event_date": "2024-04-19",
   *       "event_address": "Adresse de l'événement"
   *     },
   *     {
   *       "event_title": "Autre titre d'événement",
   *       "event_date": "2024-04-20",
   *       "event_address": "Autre adresse d'événement"
   *     }
   *   ]
   * }
   * @example response - 500 - Erreur interne au serveur
   * {
   *   "statut": 500,
   *   "message": "Une erreur est survenue lors de la récupération des événements."
   * }
   */
  .get(wrapper(Controller.displayLastEventCreateByUser.bind(Controller)));

router
  .route("/:id(\\d+)/lastEventParticipate")
  /**
   * GET /{id}/lastEventParticipate
   * @summary Affiche les 5 derniers événements auxquels un utilisateur spécifique a participé.
   * @tags User
   * @param {integer} id.path.required - L'ID de l'utilisateur
   * @returns {object} 200 - Les derniers événements auxquels l'utilisateur a participé
   * @returns {ApiError} 500 - Erreur interne du serveur
   * @example response - 200 - Exemple de réponse réussie
   * {
   *   "data": [
   *     {
   *       "event_title": "Titre de l'événement",
   *       "event_date": "2024-04-19",
   *       "event_address": "Adresse de l'événement"
   *     },
   *     {
   *       "event_title": "Autre titre d'événement",
   *       "event_date": "2024-04-20",
   *       "event_address": "Autre adresse d'événement"
   *     }
   *   ]
   * }
   * @example response - 500 - Erreur interne au serveur
   * {
   *   "statut": 500,
   *   "message": "Une erreur est survenue lors de la récupération des événements."
   * }
   */
  .get(wrapper(Controller.displayLastEventParticipateByUser.bind(Controller)));

// Route pour la connexion d'un utilisateur (login)
/**
 * POST /login
 * @summary Connecte un utilisateur.
 * @tags User
 * @param {string} request.body.email.required - L'email de l'utilisateur
 * @param {string} request.body.password.required - Le mot de passe de l'utilisateur
 * @returns {object} 200 - L'utilisateur connecté avec succès et le token JWT généré
 * @returns {ApiError} 404 - Utilisateur non trouvé
 * @returns {ApiError} 401 - L'email ou le mot de passe est invalide
 * @returns {ApiError} 500 - Erreur interne du serveur
 * @example request - Exemple de corps de requête
 *  {
 *    "email": "john@exmple.com",
 *    "password": "secret123"
 *  }
 * @example response - 200 - Exemple de réponse réussie
 * {
 *   "data": {
 *     "id": 1,
 *     "first_name": "Jo",
 *     "last_name": "Doe",
 *     "username": "john.doe",
 *     "email": "john@exae.com",
 *     "date_of_birth": "1989-12-31T23:00:00.000Z",
 *     "description": "Je suis une description très marrante",
 *     "photo": "lien_vers_photo_john_doe.png",
 *     "created_at": "2024-04-17T09:58:40.143Z",
 *     "updated_at": "2024-04-17T09:58:40.143Z",
 *     "role": "membre"
 *   },
 *   "token": "eyJhbGci..."
 * }
 * @example response - 404 - Utilisateur non trouvé
 * {
 *   "statut": 404,
 *   "message": "Utilisateur non trouvé."
 * }
 * @example response - 401 - L'email ou le mot de passe est invalide
 * {
 *   "statut": 401,
 *   "message": "L'email ou le mot de passe est invalide"
 * }
 * @example response - 500 - Erreur interne au serveur
 * {
 *   "statut": 500,
 *   "message": "Une erreur est survenue lors de la connexion de l'utilisateur."
 * }
 */
router.post("/login", wrapper(Controller.loginUser));

// Route pour la déconnexion d'un utilisateur (logout)
/**
 * POST /logout
 * @summary Déconnecte un utilisateur.
 * @tags User
 * @security BearerAuth
 * @returns {object} 204 - Succès de la déconnexion de l'utilisateur
 * @returns {ApiError} 401 - Non autorisé, token invalide
 * @returns {ApiError} 500 - Erreur interne du serveur
 * @example response - 204 - Exemple de réponse réussie
 * @example response - 401 - Non autorisé, token invalide
 * {
 *   "statut": 401,
 *   "message": "Token invalide"
 * }
 * @example response - 500 - Erreur interne du serveur
 * {
 *   "statut": 500,
 *   "message": "Une erreur est survenue lors de la déconnexion de l'utilisateur."
 * }
 */
router.post("/logout", wrapper(Controller.logoutUser));

router
  .route("/:username")
  // ROUTE GET ONE USER BY id
  /**
   * GET /users/{username}
   * @summary Récupère les informations d'un utilisateur par son nom d'utilisateur.
   * @tags User
   * @security BearerAuth
   * @param {string} username.path.required - Nom d'utilisateur de l'utilisateur à récupérer
   * @returns {object} 200 - Les informations de l'utilisateur
   * @returns {ApiError} 404 - Utilisateur non trouvé
   * @returns {ApiError} 500 - Erreur interne du serveur
   * @example response - 200 - Exemple de réponse réussie
   * {
   *   "data": {
   *     "first_name": "John",
   *     "last_name": "Doe",
   *     "username": "john_doe",
   *     "email": "john@exmple.com",
   *     "date_of_birth": "1990-01-01",
   *     "description": "",
   *     "photo": "https://exemple.com/lien_vers_image_par_defaut.png",
   *     "created_at": "2024-04-19T12:00:00Z",
   *     "updated_at": "2024-04-19T12:00:00Z"
   *   }
   * }
   * @example response - 404 - Utilisateur non trouvé
   * {
   *   "statut": 404,
   *   "message": "Utilisateur non trouvé."
   * }
   * @example response - 500 - Erreur interne du serveur
   * {
   *   "statut": 500,
   *   "message": "Une erreur est survenue lors de la récupération des informations de l'utilisateur."
   * }
   */
  .get(wrapper(Controller.getUserByUsername.bind(Controller)));

export default router;
