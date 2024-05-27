import fs from 'fs';
import path from 'path';
import CoreController from "./core.controller.js";
import { sportDatamapper } from "../datamappers/index.datamapper.js";
import ApiError from "../errors/error.js";

export default class SportController extends CoreController {
  static entityName = "sport";

  static mainDatamapper = sportDatamapper;

  static async updateSport(req, res, next) {
    const { id } = req.params;
    const input = req.body;

    if (input.image) {
      try {
        const base64Data = input.image;
        const buffer = Buffer.from(base64Data, 'base64');
        const sportId = req.params.id;
        const filename = `sport_${sportId}_image_${Date.now()}.png`; // Pour générer un nom de fichier avec l'id du sport
        const imagePath = path.join('public', 'sport_photo', filename);
        await fs.writeFile(imagePath, buffer, (err) => {
          if (err) {
            console.error(`Erreur lors du téléchargement de l'image:`, err);
            next(new ApiError(500, `Erreur lors du téléchargement de l'image:`));
          }
        });

        input.image = imagePath.replace('public/', '');
      } catch (error) {
        console.error(`Erreur lors du téléchargement de l'image:`, error);
        return next(new ApiError(500, `Erreur lors du téléchargement de l'image:`));
      }
    }

    const row = await this.mainDatamapper.update(id, input);
    if (!row) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }
}
