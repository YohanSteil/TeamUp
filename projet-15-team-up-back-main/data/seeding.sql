BEGIN;

-- Insérer des données dans la table "level"
INSERT INTO "level" ("name", "created_at", "updated_at") VALUES
    ('Débutant', now(), now()),
    ('Intermédiaire', now(), now()),
    ('Avancé', now(), now());

-- Insérer des données dans la table "sport"
INSERT INTO "sport" ("name", "image", "created_at", "updated_at") VALUES
    ('Tennis', 'sport_photo/sport_1_image_1713345766462.png', now(), now()),
    ('Football', 'sport_photo/sport_2_image_1713345857217.png', now(), now()),
    ('Yoga', 'sport_photo/sport_3_image_1713346013445.png', now(), now()),
    ('Natation', 'sport_photo/sport_4_image_1713647101711.png', now(), now()),
    ('Basketball', 'sport_photo/sport_5_image_1713346072391.png', now(), now()),
    ('Course à pied', 'sport_photo/sport_6_image_1713524613520.png', now(), now()),
    ('Volleyball de plage', 'sport_photo/sport_7_image_1713347333124.png', now(), now()),
    ('Musculation', 'sport_photo/sport_8_image_1713524926130.png', now(), now()),
    ('Échecs', 'sport_photo/sport_9_image_1713528202661.png', now(), now()),
    ('Pilates', 'sport_photo/sport_10_image_1713734133021.png', now(), now()),
    ('Golf', 'sport_photo/sport_11_image_1713528672533.png', now(), now()),
    ('Boxe', 'sport_photo/sport_12_image_1713528936829.png', now(), now()),
    ('Handball', 'sport_photo/sport_13_image_1713347232508.png', now(), now()),
    ('Surf', 'sport_photo/sport_14_image_1713529338084.png', now(), now()),
    ('Zumba', 'sport_photo/sport_15_image_1713530350358.png', now(), now()),
    ('Rugby', 'sport_photo/sport_16_image_1713530424683.png', now(), now()),
    ('Patinage artistique', 'sport_photo/sport_17_image_1713530644306.png', now(), now()),
    ('Badminton', 'sport_photo/sport_18_image_1713347451790.png', now(), now()),
    ('Danse latine', 'sport_photo/sport_19_image_1713531132326.png', now(), now()),
    ('Méditation', 'sport_photo/sport_20_image_1713531254780.png', now(), now()),
    ('Gymnastique', 'sport_photo/sport_21_image_1713534641610.png', now(), now()),
    ('Judo ', 'sport_photo/sport_22_image_1713534674901.png', now(), now()),
    ('Molkky ', 'sport_photo/sport_23_image_1713534704068.png', now(), now()),
    ('Pétanque ', 'sport_photo/sport_24_image_1713534425421.png', now(), now()),
    ('Cyclisme', 'sport_photo/sport_25_image_1713534287008.png', now(), now());


-- Insérer des données dans la table "users"
INSERT INTO "users" ("first_name", "last_name", "username", "email", "password", "date_of_birth", "description", "photo", "created_at", "updated_at", "role") 
VALUES
    ('John', 'Doe', 'john.doe', 'john@example.com', 'mot_de_passe', '1990-01-01', 'Je suis une description très marrante', 'profile_photo/DEFAULT.jpg', now(), now(), 'admin'),
    ('Alice', 'Smith', 'alice.smith', 'alice@example.com', 'mot_de_passe', '1995-05-15', '', 'profile_photo/DEFAULT.jpg', now(), now(), 'admin'),
    ('Bob', 'Johnson', 'bob.johnson', 'bob@example.com', 'mot_de_passe', '1988-09-20', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Emma', 'Brown', 'emma.brown', 'emma@example.com', 'mot_de_passe', '1992-03-10', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Chris', 'Evans', 'chris.evans', 'chris@example.com', 'mot_de_passe', '1985-06-13', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Sophia', 'Miller', 'sophia.miller', 'sophia@example.com', 'mot_de_passe', '1998-09-25', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Oliver', 'Taylor', 'oliver.taylor', 'oliver@example.com', 'mot_de_passe', '1987-12-28', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Mia', 'Moore', 'mia.moore', 'mia@example.com', 'mot_de_passe', '1994-02-14', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Ava', 'White', 'ava.white', 'ava@example.com', 'mot_de_passe', '1996-07-17', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Liam', 'Wilson', 'liam.wilson', 'liam@example.com', 'mot_de_passe', '1990-11-21', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Emily', 'Clark', 'emily.clark', 'emily@example.com', 'mot_de_passe', '1993-04-19', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Daniel', 'Thomas', 'daniel.thomas', 'daniel@example.com', 'mot_de_passe', '1991-08-23', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Amelia', 'Anderson', 'amelia.anderson', 'amelia@example.com', 'mot_de_passe', '1997-02-12', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('William', 'Harris', 'william.harris', 'william@example.com', 'mot_de_passe', '1989-10-15', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Sofia', 'Martinez', 'sofia.martinez', 'sofia@example.com', 'mot_de_passe', '1995-03-27', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('James', 'Young', 'james.young', 'james@example.com', 'mot_de_passe', '1986-07-30', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Isabella', 'Lopez', 'isabella.lopez', 'isabella@example.com', 'mot_de_passe', '1998-12-05', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Ethan', 'Gonzalez', 'ethan.gonzalez', 'ethan@example.com', 'mot_de_passe', '1984-11-09', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Charlotte', 'Hernandez', 'charlotte.hernandez', 'charlotte@example.com', 'mot_de_passe', '1992-09-18', '','profile_photo/DEFAULT.jpg', now(), now(), 'member'),
    ('Alexander', 'King', 'alexander.king', 'alexander@example.com', 'mot_de_passe', '1996-05-22', '','profile_photo/DEFAULT.jpg', now(), now(), 'member');

-- Insérer des données dans la table "event"
INSERT INTO "event" ("title", "date", "organizer", "description", "number_of_participants", "address", "start_time", "end_time", "level_id", "sport_id", "created_at", "updated_at") 
VALUES
    ('Tournoi de tennis', '2024-04-27', 1, 'Tournoi de tennis', 3, '123 Rue Principale, Lyon', now(), now() + INTERVAL '4 hours', 1, 1, now(), now()),
    ('Match de football', '2024-04-27', 2, 'Match de football', 5, '456 Avenue Centrale, Nice', now(), now() + INTERVAL '3 hours', 2, 2, now(), now()),
    ('Séance de yoga en plein air', '2024-04-17', 3, 'Séance de yoga en plein air', 2, '789 Rue Secondaire, Paris', now(), now() + INTERVAL '1.5 hours', 3, 3, now(), now()),
    ('Tournoi de badminton', '2024-04-27', 4, 'Tournoi de badminton', 4, '567 Rue Sportive, Paris', now(), now() + INTERVAL '4 hours', 1, 18, now(), now()),
    ('Match de basket-ball', '2024-04-27', 5, 'Match de basket-ball', 7, '890 Boulevard Principal, Marseille', now(), now() + INTERVAL '2.5 hours', 2, 5, now(), now()),
    ('Cours de Pilates', '2024-04-17', 6, 'Cours de Pilates en salle', 8, '234 Avenue Sportive, Marseille', now(), now() + INTERVAL '1.5 hours', 3, 10, now(), now()),
    ('Randonnée en montagne', '2024-04-25', 7, 'Randonnée en montagne', 10, '345 Chemin Nature, Toulouse', now(), now() + INTERVAL '6 hours', 1, 6, now(), now()),
    ('Session de natation', '2024-04-20', 8, 'Session de natation', 5, '678 Rue Aquatique, Toulouse', now(), now() + INTERVAL '2 hours', 2, 4, now(), now()),
    ('Cours de danse latine', '2024-04-26', 9, 'Cours de danse latine', 6, '789 Place Salsa, Toulouse', now(), now() + INTERVAL '1.5 hours', 3, 19, now(), now()),
    ('Tournoi de tennis de table', '2024-04-21', 10, 'Tournoi de tennis de table', 8, '890 Rue Ping-Pong, Grenoble', now(), now() + INTERVAL '4 hours', 1, 1, now(), now()),
    ('Match de volley-ball de plage', '2024-04-27', 11, 'Match de volley-ball de plage', 10, '123 Avenue Sable, Tours', now(), now() + INTERVAL '3 hours', 2, 7, now(), now()),
    ('Séance de méditation', '2024-04-18', 12, 'Séance de méditation', 7, '234 Rue Zen, Strasbourg', now(), now() + INTERVAL '1 hour', 3, 20, now(), now()),
    ('Tournoi d échecs', '2024-04-22', 13, 'Tournoi d échecs', 6, '345 Avenue Gambit, Tours', now(), now() + INTERVAL '4 hours', 1, 9, now(), now()),
    ('Match de handball', '2024-04-30', 14, 'Match de handball', 9, '456 Rue Goal, Tours', now(), now() + INTERVAL '2.5 hours', 2, 13, now(), now()),
    ('Cours de boxe', '2024-04-19', 15, 'Cours de boxe', 5, '567 Rue Ring, Ville', now(), now() + INTERVAL '1.5 hours', 3, 12, now(), now()),
    ('Tournoi de golf', '2024-05-01', 16, 'Tournoi de golf', 8, '678 Avenue Fairway, Strasbourg', now(), now() + INTERVAL '6 hours', 1, 11, now(), now()),
    ('Session de surf', '2024-05-02', 17, 'Session de surf', 4, '789 Boulevard Vague, Grenoble', now(), now() + INTERVAL '3 hours', 2, 14, now(), now()),
    ('Cours de Zumba', '2024-05-04', 18, 'Cours de Zumba', 7, '890 Rue Salsa, Grenoble', now(), now() + INTERVAL '1.5 hours', 3, 15, now(), now()),
    ('Match de rugby', '2024-05-04', 19, 'Match de rugby', 10, '123 Avenue Tacle, Grenoble', now(), now() + INTERVAL '2 hours', 1, 16, now(), now()),
    ('Cours de patinage artistique', '2024-05-05', 20, 'Cours de patinage artistique', 6, '234 Rue Glace, Brest', now(), now() + INTERVAL '1.5 hours', 2, 17, now(), now()),
    ('Tournoi de tennis', '2024-05-05', 1, 'Tournoi de tennis', 4, '123 Rue Principale, Paris', now(), now() + INTERVAL '4 hours', 1, 1, now(), now()),
    ('Match de football', '2024-05-05', 2, 'Match de football', 6, '456 Avenue Centrale, Paris', now(), now() + INTERVAL '3 hours', 2, 2, now(), now()),
    ('Séance de yoga en plein air', '2024-05-08', 3, 'Séance de yoga en plein air', 8, '789 Rue Secondaire, Lyon', now(), now() + INTERVAL '1.5 hours', 3, 3, now(), now()),
    ('Tournoi de badminton', '2024-05-09', 4, 'Tournoi de badminton', 5, '567 Rue Sportive, Lyon', now(), now() + INTERVAL '4 hours', 1, 18, now(), now()),
    ('Match de basket-ball', '2024-05-10', 5, 'Match de basket-ball', 7, '890 Boulevard Principal, Lyon', now(), now() + INTERVAL '2.5 hours', 2, 5, now(), now()),
    ('Cours de Pilates', '2024-05-11', 6, 'Cours de Pilates en salle', 9, '234 Avenue Sportive, Paris', now(), now() + INTERVAL '1.5 hours', 3, 10, now(), now()),
    ('Randonnée en montagne', '2024-05-12', 7, 'Randonnée en montagne', 12, '345 Chemin Nature, Paris', now(), now() + INTERVAL '6 hours', 1, 6, now(), now()),
    ('Session de natation', '2024-05-13', 8, 'Session de natation', 6, '678 Rue Aquatique, Marseille', now(), now() + INTERVAL '2 hours', 2, 4, now(), now()),
    ('Cours de danse latine', '2024-05-14', 9, 'Cours de danse latine', 7, '789 Place Salsa, Marseille', now(), now() + INTERVAL '1.5 hours', 3, 19, now(), now()),
    ('Tournoi de tennis de table', '2024-05-15', 10, 'Tournoi de tennis de table', 10, '890 Rue Ping-Pong, Marseille', now(), now() + INTERVAL '4 hours', 1, 1, now(), now());

-- Insérer des données dans la table "user_has_event"
INSERT INTO "user_has_event" ("user_id", "event_id") VALUES
    (1, 1), 
    (2, 2), 
    (3, 2), 
    (4, 2), 
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15),
    (16, 16),
    (17, 17),
    (18, 18),
    (19, 19),
    (20, 20);

COMMIT;