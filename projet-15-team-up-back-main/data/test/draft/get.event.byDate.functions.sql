CREATE OR REPLACE FUNCTION get_events_by_date(
    search_date DATE
) RETURNS TABLE (
    event_id INT,
    event_title TEXT,
    event_date TIMESTAMP WITH TIME ZONE,  -- Change data type to match the column in the table
    organizer_id INT,
    event_description TEXT,
    event_address TEXT,
    event_start_time TIMESTAMP WITH TIME ZONE,
    event_end_time TIMESTAMP WITH TIME ZONE,
    event_level_id INT,
    event_sport_id INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        id AS event_id,
        title AS event_title,
        date AS event_date,
        organizer AS organizer_id,
        description AS event_description,
        address AS event_address,
        start_time AS event_start_time,
        end_time AS event_end_time,
        level_id AS event_level_id,
        sport_id AS event_sport_id
    FROM
        event
    WHERE
        date = search_date;
END;
$$ LANGUAGE sql;