import CoreController from "./core.controller.js";
import { eventsDatamapper } from "../datamappers/index.datamapper.js";
import ApiError from "../errors/error.js";

export default class EventsController extends CoreController {
  static entityName = "event";

  static mainDatamapper = eventsDatamapper;

  static async getAllEvent(_, res) {
    const rows = await this.mainDatamapper.findAllEvent();
    return res.json({ data: rows });
  }

  static async getEventDetails(req, res, next) {
    const { id } = req.params;
    const row = await this.mainDatamapper.getOneEventDetails(id);
    if (!row) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }

  static async searchEvent(req, res, next) {
    const { date, address, sport, level } = req.query;
    const rows = await this.mainDatamapper.searchEvents(
      date,
      address,
      sport,
      level
    );

    if (rows.length === 0) {
      return next(new ApiError(404, `${this.entityName} introuvable`));
    }
    return res.status(200).json({ data: rows });
  }

  // DISPLAY 20 LAST EVENT CREATE FOR HOMEPAGE
  static async getLatest(req, res) {
    const rows = await this.mainDatamapper.LatestEvents();
    return res.status(200).json({ data: rows });
  }

  static async addUserToEvent(req, res, next) {
    const { eventId } = req.params;
    const userId = req.user.id;

    try {
      // Tenter d'ajouter l'utilisateur à l'événement
      const result = await this.mainDatamapper.insertUserToEvent(userId, eventId);
      // Vérifier si l'opération a réussi
      if (result.success) {
        return res.json({ message: "Utilisateur ajouté avec succès à l'événement" });
      }
      return next(new ApiError(400, result.error));
    } catch (error) {
      return next(new ApiError(500, "Erreur interne du serveur"));
    }
  }

  static async deleteUserToEvent(req, res, next) {
    const { eventId } = req.params;
    const userId = req.user.id;

    try {
      const result = await this.mainDatamapper.removeUserToEvent(userId, eventId);

      if (result.success) {
        return res.json({ message: "Utilisateur supprimé avec succès de l'évènement" });
      }
      return next(new ApiError(400, result.error));
    } catch (error) {
      return next(new ApiError(500, "Erreur interne du serveur"));
    }
  }

  static async deleteEvent(req, res, next) {
    const { id: eventId } = req.params;
    const userId = req.user.id; // id user récupéré grâce au token

    try {
      const deleted = await this.mainDatamapper.deleteEvent(userId, eventId);
      if (!deleted) {
        return next(new ApiError(403, "Vous n'êtes pas autorisé à supprimer cet événement."));
      }
      return res.status(204).json();
    } catch (error) {
      if (error instanceof ApiError && error.status === 403) {
        return next(error);
      }
      return next(new ApiError(500, "Erreur lors de la suppression de l'événement."));
    }
  }
}
