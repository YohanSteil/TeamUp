/* eslint-disable camelcase */
import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static readTableName = "users";

  static writeTableName = "users";

  async createUser(input) {
    const result = await this.client.query(
      `SELECT * FROM create_${this.constructor.writeTableName}($1)`,
      [input]
    );
    const userData = { ...result.rows[0] };
    delete userData.password;
    return userData;
  }

  async findUserByEmail(email) {
    const result = await this.client.query(
      `SELECT * FROM ${this.constructor.writeTableName} WHERE "email" = ($1);`,
      [email]
    );
    return result.rows[0];
  }

  async findUserByUsername(username) {
    const result = await this.client.query(
      `SELECT * FROM ${this.constructor.writeTableName} WHERE "username" = ($1);`,
      [username]
    );
    return result.rows[0];
  }

  async LastEventCreateByUser(id) {
    const result = await this.client.query(
      `SELECT e.title AS event_title, e.date AS event_date, e.address AS event_address
      FROM event e
      JOIN users u ON e.organizer = u.id
      WHERE u.id = ($1)
      ORDER BY e.start_time DESC
      LIMIT 5;`,
      [id]
    );
    return result.rows;
  }

  async LastEventParticipateByUser(id) {
    const result = await this.client.query(
      `SELECT 
      e.*,  -- Sélectionnez toutes les colonnes de la table event
      s.image AS sport_image  -- Ajoutez la colonne d'image du sport
  FROM 
      event e
  JOIN 
      user_has_event ue ON e.id = ue.event_id
  JOIN 
      users u ON ue.user_id = u.id
  LEFT JOIN 
      sport s ON e.sport_id = s.id
  WHERE 
      ue.user_id = $1  -- Sélectionne les événements auxquels l'utilisateur a participé
      AND e.organizer != u.id  -- Exclut les événements qu'il a créés
  ORDER BY 
      e.start_time DESC
  LIMIT 5;`,
      [id]
    );

    return result.rows;
  }

  async deleteUser(id) {
    try {
      // Supprimer toutes les entrées faisant référence à userId dans user_has_event
      await this.client.query(
        `DELETE FROM user_has_event WHERE user_id = $1`,
        [id]
      );

      const events = await this.client.query(
        `SELECT * FROM "event" WHERE organizer = $1`,
        [id]
      );
      if (events.rows && events.rows.length > 0) {
        // Supprimer les participants de tous les event organisés par userId
        await Promise.all(events.rows.map(async (event) => {
          await this.client.query(
            `DELETE FROM user_has_event WHERE event_id = $1`,
            [event.id]
          );
        }));
      }

      // Supprimer les events créés par userId
      await this.client.query(
        `DELETE FROM event WHERE organizer = $1`,
        [id]
      );

      // Supprimer l'utilisateur (userId)
      const result = await this.client.query(
        `DELETE FROM ${this.constructor.writeTableName} WHERE id = $1`,
        [id]
      );

      return !!result.rowCount;
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      return false;
    }
  }
}
