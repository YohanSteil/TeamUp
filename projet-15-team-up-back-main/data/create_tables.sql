BEGIN;
DROP TABLE IF EXISTS "user_has_event",
"user_has_sport",
"event",
"sport",
"level",
"users" CASCADE;
CREATE TABLE "users" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "date_of_birth" date NOT NULL,
  "description" TEXT,
  "photo" TEXT NOT NULL DEFAULT 'profile_photo/user_21_image_1713298344121.png',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz,
  "role" TEXT NOT NULL DEFAULT 'member'
);
CREATE TABLE "level" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);
CREATE TABLE "sport" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "image" TEXT NOT NULL DEFAULT 'https://exemple.com/lien_vers_image_par_defaut.png',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);
CREATE TABLE "event" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "date" timestamptz NOT NULL,
  "organizer" INT NOT NULL REFERENCES "users"("id"),
  "description" TEXT,
  "number_of_participants" INT NOT NULL,
  "address" TEXT NOT NULL,
  "start_time" timestamptz NOT NULL DEFAULT now(),
  "end_time" timestamptz NOT NULL,
  "level_id" INT NOT NULL REFERENCES "level"("id"),
  "sport_id" INT NOT NULL REFERENCES "sport"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);
CREATE TABLE "user_has_event" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- Primary key column
  "event_id" INT NOT NULL REFERENCES "event"("id"),
  -- Foreign key column referencing event table
  "user_id" INT NOT NULL REFERENCES "users"("id"),
  -- Foreign key column referencing user table
  CONSTRAINT "unique_participant_event" UNIQUE ("event_id", "user_id") -- Unique constraint on event_id and user_id combination
);
CREATE TABLE "user_has_sport" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "sport_id" INT NOT NULL REFERENCES "sport"("id"),
  "user_id" INT NOT NULL REFERENCES "users"("id")
);
COMMIT;