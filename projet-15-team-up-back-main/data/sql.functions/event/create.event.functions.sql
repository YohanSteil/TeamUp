BEGIN;

CREATE FUNCTION create_event(input json) RETURNS event AS $$

INSERT INTO "event" (
    "title",
    "date",
    "organizer",
    "description",
    "number_of_participants",
    "address",
    "address_lat",
	"address_lng",
    "start_time",
    "end_time",
    "level_id",
    "sport_id",
    "created_at",
    "updated_at"
)
VALUES (
    input->>'title',
    make_date(
        CAST(SPLIT_PART(input->>'date', '-', 1) AS INTEGER), -- Année
        CAST(SPLIT_PART(input->>'date', '-', 2) AS INTEGER), -- Mois
        CAST(SPLIT_PART(input->>'date', '-', 3) AS INTEGER) -- Jour
    ),
    (input->>'organizer')::int,
    input->>'description',
    (input->>'number_of_participants')::int,
    input->>'address',
    (input->>'address_lat')::float,
    (input->>'address_lng')::float,
    to_timestamp((input->>'date')::text || ' ' || (input->>'start_time')::text, 'YYYY-MM-DD HH24hMI')::timestamptz,
    to_timestamp((input->>'date')::text || ' ' || (input->>'end_time')::text, 'YYYY-MM-DD HH24hMI')::timestamptz,
    (input->>'level_id')::int,
    (input->>'sport_id')::int,
    current_timestamp,
    null
)
RETURNING *;

$$ LANGUAGE sql STRICT;

COMMIT;
-- CREATE EVENT SYNTAX TIME FORMAT
-- {
-- 		"title": "Test Joi 1",
--         "date": "24/04/2024",
--         "organizer": "1",
--         "description": "Test 1",
--         "number_of_participants": "7",
--         "address": "Test 1",
--         "start_time": "09h05",
--         "end_time": "14h05",
--         "level_id": 1,
--         "sport_id": 1
-- }


-- GET EVENT TEAM
-- CREATE OR REPLACE FUNCTION get_event_team(event_id_param INT) RETURNS TABLE (
--         organizer_first_name TEXT,
--         organizer_last_name TEXT,
--         participant_first_name TEXT,
--         participant_last_name TEXT
--     ) AS $$ BEGIN RETURN QUERY
-- SELECT u_org.first_name AS organizer_first_name,
--     u_org.last_name AS organizer_last_name,
--     u_part.first_name AS participant_first_name,
--     u_part.last_name AS participant_last_name
-- FROM user_has_event AS uhe
--     JOIN "users" AS u_org ON uhe.user_id = u_org.id -- Jointure pour récupérer l'organisateur
--     JOIN "users" AS u_part ON uhe.user_id = u_part.id -- Jointure pour récupérer les participants
-- WHERE uhe.event_id = event_id_param
--     AND uhe.user_id IS NOT NULL;
-- -- Assurez-vous que le participant_id n'est pas nul pour distinguer l'organisateur des participants
-- END;
-- $$ LANGUAGE plpgsql;
-- COMMIT;

-- /* 
--  ******update syntax example*******
--  SELECT * FROM update_event('{
--  "id": 334,
--  "date": "2023-04-04",
--  "organizer": 7,
--  "description": "skydiving",
--  "number_of_participants": 10,
--  "adresse": "123 Rue Chaponny, Roma",
--  "start_time": "2024-04-03T12:59:10.549Z",
--  "end_time": "2024-04-03T15:59:10.549Z"
--  }');
 
 
--  */