BEGIN;

CREATE FUNCTION create_level(input json) RETURNS level AS $$

INSERT INTO level (
    "name",
    "created_at",
    "updated_at"
)
VALUES (
    input->>'name',
    COALESCE(to_timestamp(input->>'created_at', 'YYYY-MM-DD HH24:MI:SS')::timestamptz, CURRENT_TIMESTAMP),
    COALESCE(to_timestamp(input->>'updated_at', 'YYYY-MM-DD HH24:MI:SS')::timestamptz, CURRENT_TIMESTAMP)
)
RETURNING *;

$$ LANGUAGE sql STRICT;

COMMIT;