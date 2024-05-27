BEGIN;

CREATE OR REPLACE FUNCTION update_event(id integer, input json) 
RETURNS VOID
AS $$

UPDATE "event"
SET
    "title" = COALESCE(input->>'title', "title"),
    "date" = COALESCE(to_timestamp((input->>'date')::text, 'DD/MM/YYYY')::date, "date"),
    "organizer" = COALESCE((input->>'organizer')::int, "organizer"),
    "description" = COALESCE(input->>'description', "description"),
    "number_of_participants" = COALESCE((input->>'number_of_participants')::int, "number_of_participants"),
    "address" = COALESCE(input->>'address', "address"),
    "start_time" = COALESCE(to_timestamp((input->>'date')::text || ' ' || (input->>'start_time')::text, 'DD/MM/YYYY HH24hMI')::timestamptz, "start_time"),
    "end_time" = COALESCE(to_timestamp((input->>'date')::text || ' ' || (input->>'end_time')::text, 'DD/MM/YYYY HH24hMI')::timestamptz, "end_time"),
    "level_id" = COALESCE((input->>'level_id')::int, "level_id"),
    "sport_id" = COALESCE((input->>'sport_id')::int, "sport_id")
    WHERE
        "id" = $1;

$$ LANGUAGE sql STRICT;

COMMIT;