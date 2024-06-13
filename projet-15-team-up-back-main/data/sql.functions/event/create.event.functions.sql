BEGIN;

CREATE FUNCTION create_event(input json) RETURNS event AS $$

INSERT INTO "event" (
    "title",
    "date",
    "organizer",
    "description",
    "number_of_participants",
    "address",
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
