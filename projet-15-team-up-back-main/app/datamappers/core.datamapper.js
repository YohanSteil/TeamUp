export default class CoreDatamapper {
  static readTableName = null;

  static writeTableName = null;

  constructor(client) {
    this.client = client;
  }

  async findAll() {
    const result = await this.client.query(
      `SELECT * FROM "${this.constructor.readTableName}"`
    );

    // Vérifier si le champ "password" existe dans les résultats
    const hasPassword = result.rows.some((row) => 'password' in row);

    // Supprimer le champ "password" si nécessaire
    const datas = result.rows.map((row) => {
      const data = { ...row };
      if (hasPassword && data.password) {
        delete data.password;
      }
      return data;
    });

    return datas;
  }

  async findById(id) {
    const result = await this.client.query(
      `SELECT * FROM "${this.constructor.readTableName}" WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return null; // Renvoyer null si aucun résultat trouvé
    }

    // Vérifier si le champ "password" existe dans les résultats
    const hasPassword = 'password' in result.rows[0];

    // Supprimer le champ "password" si nécessaire
    const data = { ...result.rows[0] };
    if (hasPassword && data.password) {
      delete data.password;
    }

    return data;
  }

  async create(input) {
    const result = await this.client.query(
      `SELECT * FROM create_${this.constructor.writeTableName}($1)`,
      [input]
    );
    return result.rows[0];
  }

  async update(id, input) {
    await this.client.query(
      `SELECT * FROM update_${this.constructor.writeTableName}($1, $2)`,
      [id, input]
    );
    const result = await this.client.query(
      `SELECT * FROM ${this.constructor.writeTableName} WHERE id=$1`,
      [id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.client.query(
      `DELETE FROM ${this.constructor.writeTableName} WHERE id = $1`,
      [id]
    );
    return !!result.rowCount;
  }
}
