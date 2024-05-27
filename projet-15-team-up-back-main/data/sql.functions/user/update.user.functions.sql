BEGIN;

CREATE OR REPLACE FUNCTION update_users(id integer, input json) 
RETURNS VOID
AS $$

    UPDATE "users"
    SET
    "first_name" = COALESCE(input->>'first_name', "first_name"),
    "last_name" = COALESCE(input->>'last_name', "last_name"),
    "username" = COALESCE(input->>'username', "username"),
    "email" = COALESCE(input->>'email', "email"),
    "password" = COALESCE(input->>'password', "password"),
    "date_of_birth" = COALESCE((input->>'date_of_birth')::date, "date_of_birth"),
    "description" = COALESCE(input->>'description', "description"),
    "photo" = COALESCE(input->>'photo', "photo"),
    "role" = COALESCE(input->>'role',"role")
    WHERE
        "id" = $1;

$$ LANGUAGE sql STRICT;

COMMIT;