BEGIN;

CREATE FUNCTION create_sport(input json) RETURNS sport AS $$

INSERT INTO sport (
    "name",
    "image",
    "created_at",
    "updated_at"
)
VALUES (
    input->>'name',
    input->>'image',
    COALESCE(to_timestamp(input->>'created_at', 'YYYY-MM-DD HH24:MI:SS')::timestamptz, CURRENT_TIMESTAMP),
    COALESCE(to_timestamp(input->>'updated_at', 'YYYY-MM-DD HH24:MI:SS')::timestamptz, CURRENT_TIMESTAMP)
)
RETURNING *;

$$ LANGUAGE sql STRICT;

COMMIT;