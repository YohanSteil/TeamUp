import CoreDatamapper from "./core.datamapper.js";
import ApiError from "../errors/error.js";

export default class EventsDatamapper extends CoreDatamapper {
  static readTableName = "event";

  static writeTableName = "event";

  async searchEvents(date, address, sport, level) {
    let sqlQuery = `
    SELECT 
    e.*, 
    to_char(e.date, 'DD/MM/YYYY') AS date,
    l.name AS level_name,
    s.name AS sport_name,
    s.image AS sport_image
    FROM 
    event e
    LEFT JOIN 
    level l ON e.level_id = l.id
    LEFT JOIN 
    sport s ON e.sport_id = s.id
    WHERE `;
    const conditions = [];

    if (date) conditions.push(`date = '${date}'`);
    if (address) conditions.push(`address ILIKE '%${address}%'`);
    if (sport) conditions.push(`sport_id = '${sport}'`);
    if (level) conditions.push(`level_id = '${level}'`);

    if (conditions.length > 0) {
      sqlQuery += conditions.join(" AND ");
    } else {
      sqlQuery += "true";
    }

    const events = await this.client.query(sqlQuery);
    return events.rows;
  }

  async findAllEvent() {
    const result = await this.client.query(
      `SELECT 
      e.*,  -- Sélectionnez toutes les colonnes de la table event
      s.image AS sport_image  -- Ajoutez la colonne d'image du sport
  FROM 
      "event" e
  LEFT JOIN 
      "sport" s ON e.sport_id = s.id;`
    );

    // Vérifier si le champ "password" existe dans les résultats
    const hasPassword = result.rows.some((row) => "password" in row);

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

  // DISPLAY 20 LAST EVENT CREATE FOR HOMEPAGE
  async LatestEvents() {
    const result = await this.client.query(
      `SELECT
      e.*,
      to_char(e.date, 'DD/MM/YYYY') AS date,
      s.image AS sport_image,
      l.name AS level_name,
      sp.name AS sport_name -- Ajoutez le nom du sport
  FROM
      "event" e
  LEFT JOIN
      "sport" s ON e.sport_id = s.id
  LEFT JOIN
      "level" l ON e.level_id = l.id
  LEFT JOIN
      "sport" sp ON e.sport_id = sp.id -- Jointure avec la table "sport"
  ORDER BY
      e.created_at DESC
  LIMIT 20;`
    );

    return result.rows;
  }

  async getOneEventDetails(id) {
    const result = await this.client.query(
      `SELECT 
      e.id AS id,
      e.title AS title,
      to_char(e.date, 'DD/MM/YYYY') AS date,
      e.description AS description,
      to_char(e.created_at, 'DD/MM/YYYY') AS created_at,
      to_char(e.updated_at, 'DD/MM/YYYY') AS updated_at,
      o.id AS organizer_id,
      o.username AS organizer_name,
      o.photo AS organizer_photo,
      s.id AS sport_id,
      s.name AS sport_name,
      s.image AS sport_image,
      l.id AS level_id,
      l.name AS level_name,
      COALESCE(
          json_agg(
              json_build_object('id', u.id, 'username', u.username, 'photo', u.photo)
          ) FILTER (WHERE u.username IS NOT NULL), '[]'::json
      ) AS participants,
      to_char(e.start_time, 'HH24hMI') AS start_time,
      to_char(e.end_time, 'HH24hMI') AS end_time,
      e.address AS address,
      CASE 
          WHEN total.total_participants = 0 THEN 1
          ELSE total.total_participants
      END AS "number_of_participant_current",
      e.number_of_participants AS "number_of_participant"
  FROM 
      "event" e
  LEFT JOIN 
      "users" o ON e.organizer = o.id
  LEFT JOIN 
      "user_has_event" ue ON e.id = ue.event_id
  LEFT JOIN 
      "users" u ON ue.user_id = u.id AND u.id <> e.organizer
  LEFT JOIN 
      "sport" s ON e.sport_id = s.id
  LEFT JOIN 
      "level" l ON e.level_id = l.id
  LEFT JOIN 
      (
          SELECT 
              event_id,
              COUNT(*) AS total_participants
          FROM 
              "user_has_event"
          GROUP BY 
              event_id
      ) AS total ON e.id = total.event_id
  WHERE 
      e.id = $1
  GROUP BY
      e.id, 
      e.title, 
      e.date, 
      e.description, 
      e.created_at, 
      e.updated_at, 
      o.id, 
      o.username,  
      s.id, 
      s.name,
      s.image, 
      l.id, 
      l.name,
      e.start_time,
      e.end_time,
      e.address,
      e.number_of_participants,
      total.total_participants;`,
      [id]
    );

    return result.rows;
  }

  // eslint-disable-next-line camelcase, consistent-return
  async insertUserToEvent(userId, eventId) {
    try {
      // Vérifier si un ID d'événement est fourni
      if (!eventId) {
        return { success: false, error: "Id de Event non fourni" };
      }

      // Vérifier si l'événement existe
      const eventCheck = await this.client.query(
        `SELECT 1 
                FROM event 
                WHERE id = $1`,
        [eventId]
      );

      if (eventCheck.rows.length === 0) {
        return { success: false, error: "L'événement n'existe pas" };
      }

      // Vérifier si l'utilisateur est déjà inscrit à l'événement
      const userCheck = await this.client.query(
        `SELECT 1 
       FROM user_has_event 
       WHERE user_id = $1 AND event_id = $2`,
        [userId, eventId]
      );

      if (userCheck.rows.length > 0) {
        return { success: false, error: "L'utilisateur est déjà inscrit à l'événement" };
      }

      // Vérifier si l'événement a atteint sa capacité maximale
      const capacityCheck = await this.client.query(
        `SELECT 
                COALESCE(SUM(CASE WHEN ue.user_id IS NOT NULL THEN 1 ELSE 0 END), 0) AS number_of_participant_current, 
                e.number_of_participants AS initial_participants
            FROM 
                event e
            LEFT JOIN 
                user_has_event ue ON e.id = ue.event_id
            WHERE 
                e.id = $1
            GROUP BY 
                e.id, 
                e.number_of_participants`,
        [eventId]
      );

      // Nombre actuel de participants à l'événement
      const currentParticipants = capacityCheck.rows[0]?.number_of_participant_current || 1;
      const maxParticipants = capacityCheck.rows[0]?.initial_participants || 0;

      // Si l'événement a atteint sa capacité maximale, renvoyer une erreur
      if (currentParticipants >= maxParticipants) {
        return {
          success: false,
          error: "L'activité a atteint sa capacité maximale",
        };
      }

      // Ajouter l'utilisateur à l'événement
      const result = await this.client.query(
        `INSERT INTO user_has_event (user_id, event_id) 
             VALUES ($1, $2) 
             RETURNING *`,
        [userId, eventId]
      );

      return { success: true, data: result.rows };
    } catch (error) {
      return {
        success: false,
        error: "Échec de l'ajout de l'utilisateur à l'événement",
      };
    }
  }

  async removeUserToEvent(userId, eventId) {
    try {
      const result = await this.client.query(
        `DELETE FROM user_has_event
         WHERE user_id = $1 AND event_id = $2
         RETURNING *`,
        [userId, eventId]
      );

      if (result.rowCount === 1) {
        return { success: true };
      }
      return {
        success: false,
        error: "L'utilisateur n'a pas été trouvé dans l'événement",
      };
    } catch (error) {
      return {
        success: false,
        error: "Échec de la suppression de l'utilisateur de l'événement",
      };
    }
  }

  async deleteEvent(userId, eventId) {
    try {
      // Vérifiez d'abord si user est l'organisateur de l'event
      const event = await this.client.query(
        `SELECT organizer 
         FROM event 
         WHERE id = $1`,
        [eventId]
      );

      if (event.rows.length === 0) {
        throw new ApiError(404, "L'événement n'existe pas.");
      }

      const organizerId = event.rows[0].organizer;
      if (organizerId !== userId) {
        throw new ApiError(
          403,
          "Vous n'êtes pas autorisé à supprimer cet événement."
        );
      }

      // Supprimez l'event de la BDD
      const result = await this.client.query(
        `DELETE FROM event 
         WHERE id = $1`,
        [eventId]
      );

      if (result.rowCount === 0) {
        throw new ApiError(404, "L'event n'a pas été trouvé.");
      }

      return true; // L'événement a été supprimé avec succès
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
      throw error; // Lancez l'erreur pour qu'elle soit capturée dans le contrôleur
    }
  }
}
