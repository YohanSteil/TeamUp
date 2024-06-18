import CoreController from "./core.controller.js";
import { levelDatamapper } from "../datamappers/index.datamapper.js";

export default class LevelController extends CoreController {
  static entityName = "level";

  static mainDatamapper = levelDatamapper;
}
