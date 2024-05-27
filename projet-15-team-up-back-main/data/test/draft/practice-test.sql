-- Query to retrieve event details along with organizer and participant names
SELECT e.id AS event_id,
    -- Alias for event ID column
    e.description AS event_description,
    -- Alias for event description column
    uo.id AS organizer_id,
    -- Alias for organizer ID column
    CONCAT(uo.first_name, ' ', uo.last_name) AS organizer_name,
    -- Concatenated organizer name
    u.id AS participant_id,
    -- Alias for participant ID column
    CONCAT(u.first_name, ' ', u.last_name) AS participant_name -- Concatenated participant name
FROM "event" e
    INNER JOIN "users" uo ON e.organizer = uo.id -- Joining with the organizer table
    LEFT JOIN "user_has_event" ue ON e.id = ue.event_id -- Joining with user_has_event to get participants
    LEFT JOIN "users" u ON ue.user_id = u.id -- Joining with the users table to get participant names
ORDER BY e.id,
    u.id;
-- Ordering the result by event ID and participant ID
-- Query to retrieve event details along with participant names for a specific event
SELECT e.*,
    -- Selecting all columns from the event table
    CONCAT(u.first_name, ' ', u.last_name) AS participant_name -- Concatenated participant name
FROM "event" e
    INNER JOIN "user_has_event" ue ON e.id = ue.event_id -- Joining with user_has_event to get participants
    INNER JOIN "users" u ON ue.user_id = u.id -- Joining with the users table to get participant names
WHERE e.id = 1;
-- Filtering the result to include only event with ID 1
-- Creation of the user_has_event table with a unique constraint on event_id and user_id
CREATE TABLE "user_has_event" (
    "id" SERIAL PRIMARY KEY,
    -- Primary key column
    "event_id" INT NOT NULL REFERENCES "event"("id"),
    -- Foreign key column referencing event table
    "user_id" INT NOT NULL REFERENCES "users"("id"),
    -- Foreign key column referencing user table
    CONSTRAINT "unique_participant_event" UNIQUE ("event_id", "user_id") -- Unique constraint on event_id and user_id combination
);



-- add user to event 
  1
	  INSERT INTO "user_has_event" ("user_id", "event_id") 
VALUES
    ('7', '2');
	
	select * from event WHERE id = 2;