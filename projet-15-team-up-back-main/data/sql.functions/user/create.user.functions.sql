
BEGIN;

CREATE FUNCTION create_users(input json) RETURNS "users" AS $$

INSERT INTO "users" (
    "first_name",
    "last_name", 
    "username", 
    "email",
    "password",
    "date_of_birth",
    "description",
    "photo",
    "created_at",
    "updated_at",
	"role"
)
    VALUES (
        input->>'first_name',
        input->>'last_name',
        input->>'username',
        input->>'email',
        input->>'password',
        to_timestamp((input->>'date_of_birth')::text, 'DD/MM/YYYY')::date,
        COALESCE(input->>'description', ''),
        COALESCE(input->>'photo', 'profile_photo/DEFAULT.jpg'),
        COALESCE(to_timestamp(input->>'created_at', 'YYYY-MM-DD HH24:MI:SS')::timestamptz, CURRENT_TIMESTAMP),
        COALESCE(to_timestamp(input->>'updated_at', 'YYYY-MM-DD HH24:MI:SS')::timestamptz, CURRENT_TIMESTAMP),
		COALESCE(input->>'role', 'member')

)
    RETURNING *;


$$ LANGUAGE sql STRICT;

COMMIT;