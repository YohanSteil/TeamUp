import fs from 'fs';
import path from 'path';
import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import CoreController from "./core.controller.js";
import { userDatamapper } from "../datamappers/index.datamapper.js";
import { generateToken } from "../middlewares/jwt.middleware.js";
import tokensBlacklisted from "../utils/jwt.blacklist.js";
import ApiError from "../errors/error.js";

export default class UserController extends CoreController {
  static entityName = "users";

  static mainDatamapper = userDatamapper;

  static async createUser(req, res, next) {
    const input = req.body;

    if (!emailValidator.validate(input.email)) {
      return next(new ApiError(400, "L'email n'est pas valide."));
    }

    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const modifiesInput = { ...input, password: hashedPassword };

      const row = await this.mainDatamapper.createUser(modifiesInput);

      // 201 Created
      return res.status(201).json({ data: row });
    } catch (error) {
      if (error.code === "23505" && error.constraint === "users_email_key") {
        return next(new ApiError(409, "L'adresse email est déjà utilisée."));
      }
      if (error.code === "23505" && error.constraint === "users_username_key") {
        return next(new ApiError(409, "Pseudonyme déjà utilisé."));
      }
      // Internal Server Error
      return next(new ApiError(500, "Une erreur est survenue lors de la création de l'utilisateur."));
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userDatamapper.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Vérifier si le mot de passe est correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "L'email ou le mot de passe est invalide" });
    }

    const userData = { ...user };
    delete userData.password;

    // Générer un token JWT
    const token = generateToken(user);

    return res.json({ data: userData, token });
  }

  // !!TO DO
  static async logoutUser(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    // Récupérer le token à partir des en-têtes de la requête.

    // Ajouter le token à la liste noire
    tokensBlacklisted.push(token);

    return res.json({ message: "Logout réussi." });
  }

  static async getOneUser(req, res, next) {
    const userId = req.user.id;
    const row = await this.mainDatamapper.findById(userId);
    if (!row) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }

  static async getUserByUsername(req, res, next) {
    const { username } = req.params;
    const row = await this.mainDatamapper.findUserByUsername(username);
    if (!row) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    const userData = { ...row };
    delete userData.password;
    delete userData.role;
    delete userData.id;
    return res.json({ data: userData });
  }

  static async updateUser(req, res, next) {
    const { id } = req.user;
    const input = req.body;

    if (input.photo) {
      try {
        const base64Data = input.photo;
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `user_${id}_image_${Date.now()}.png`; // Pour générer un nom de fichier avec l'id du user
        const imagePath = path.join('public', 'profile_photo', filename);
        await fs.writeFile(imagePath, buffer, (err) => {
          if (err) {
            console.error(`Erreur lors du téléchargement de l'image:`, err);
            next(new ApiError(500, `Erreur lors du téléchargement de l'image:`));
          }
        });

        input.photo = imagePath.replace('public/', '');
      } catch (error) {
        console.error(`Erreur lors du téléchargement de l'image:`, error);
        return next(new ApiError(500, `Erreur lors du téléchargement de l'image:`));
      }
    }

    const data = await this.mainDatamapper.update(id, input);
    if (!data) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.json({ ...data });
  }

  static async displayLastEventCreateByUser(req, res) {
    const { id } = req.params;
    const rows = await this.mainDatamapper.LastEventCreateByUser(id);

    return res.json({ data: rows });
  }

  static async displayLastEventParticipateByUser(req, res) {
    const { id } = req.params;
    const rows = await this.mainDatamapper.LastEventParticipateByUser(id);

    return res.json({ data: rows });
  }

  static async deleteUser(req, res, next) {
    const { id } = req.user;
    const deleted = await this.mainDatamapper.deleteUser(id);
    if (!deleted) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.status(204).json();
  }
}
