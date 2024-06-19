import ApiError from "../errors/error.js";

export default class CoreController {
  static entityName = null;

  static mainDatamapper = null;

  static async getAll(_, res, next) {
    try {
      const rows = await this.mainDatamapper.findAll();
      return res.json({ data: rows });
    } catch (error) {
      return next(new ApiError(500, "Erreur lors de la récupération des users"));
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    const row = await this.mainDatamapper.findById(id);
    if (!row) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }

  static async create(req, res) {
    const input = req.body;
    const row = await this.mainDatamapper.create(input);
    // 201 Created
    return res.status(201).json({ data: row });
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const input = req.body;

    const row = await this.mainDatamapper.update(id, input);
    if (!row) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const deleted = await this.mainDatamapper.delete(id);
    if (!deleted) {
      return next(new ApiError(404, `${this.entityName} not found`));
    }
    return res.status(204).json();
  }
}
