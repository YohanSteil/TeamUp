BEGIN;


CREATE FUNCTION update_level(id integer, input json)
RETURNS VOID
AS $$

UPDATE "sport"
SET
    "name" = COALESCE(input->>'name', "name"),
    "updated_at" = COALESCE(to_timestamp(input->>'updated_at', 'YYYY-MM-DD HH:MI:SS')::timestamptz, "updated_at")
WHERE
    "id" = $1;

$$ LANGUAGE sql STRICT;

COMMIT;