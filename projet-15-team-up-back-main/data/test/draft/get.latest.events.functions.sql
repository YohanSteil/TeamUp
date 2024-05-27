BEGIN;

CREATE OR REPLACE FUNCTION get_latest_events() RETURNS TABLE (
        id INT,
	    title TEXT,
        date timestamptz,
        organizer INT,
        description TEXT,
        number_of_participants INT,
        address TEXT,
        start_time timestamptz,
        end_time timestamptz,
        level_id INT,
        sport_id INT,
        created_at timestamptz,
        updated_at timestamptz
    ) AS $$ BEGIN RETURN QUERY
SELECT *
FROM "event"
ORDER BY "created_at" DESC
LIMIT 20;
END;
$$ LANGUAGE plpgsql;

COMMIT;