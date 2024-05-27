BEGIN;

CREATE OR REPLACE FUNCTION get_event_team(event_id_param INT) RETURNS TABLE (
        organizer_first_name TEXT,
        organizer_last_name TEXT,
        participant_first_name TEXT,
        participant_last_name TEXT
    ) AS $$ BEGIN RETURN QUERY
SELECT u_org.first_name AS organizer_first_name,
    u_org.last_name AS organizer_last_name,
    u_part.first_name AS participant_first_name,
    u_part.last_name AS participant_last_name
FROM user_has_event AS uhe
    JOIN "users" AS u_org ON uhe.user_id = u_org.id -- Jointure pour récupérer l'organisateur
    JOIN "users" AS u_part ON uhe.user_id = u_part.id -- Jointure pour récupérer les participants
WHERE uhe.event_id = event_id_param
    AND uhe.user_id IS NOT NULL;

$$ LANGUAGE plpgsql;
COMMIT;