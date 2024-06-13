-- Inserting pets for each user
CALL insert_pets();
-- Inserting medication for each pet
INSERT INTO "medication"(
        "name",
        "dose",
        "time_of_day",
        "with_food",
        "pet_id"
    )
VALUES (
        'Miracle Drug',
        '2 1g pills',
        CURRENT_DATE,
        true,
        1
    ),
    ('Skyrizi', '1 pill', CURRENT_DATE, false, 2),
    ('Grass', 'Edibles', CURRENT_DATE, true, 3),
    (
        'Amoxicillin',
        '1 20mg pill',
        CURRENT_DATE,
        false,
        4
    ),
    (
        'Rimadyl',
        '2 75mg chewable tablets',
        CURRENT_DATE,
        true,
        5
    );
-- Inserting daycare_plan for each pet
INSERT INTO "daycare_plan"(
        "pet_id",
        "food",
        "meal_schedule",
        "cat_friendly",
        "dog_friendly",
        "kid_friendly",
        "walks"
    )
VALUES (
        1,
        'Basket Balls',
        'morning',
        false,
        true,
        true,
        1
    ),
    (
        2,
        'Cows',
        'mid-day',
        false,
        true,
        false,
        4
    ),
    (
        3,
        'Scooby Snax',
        'breakfast-diner',
        true,
        false,
        true,
        4
    ),
    (
        4,
        'Bacon',
        'evening',
        true,
        true,
        false,
        8
    ),
    (
        5,
        'Humans',
        'mid-day',
        false,
        false,
        false,
        1
    );
-- Inserting vaccine for each pet
-- INSERT INTO "vaccine"("Vaccine", "Date Issued", "pet_id", "Image")
-- VALUES ('Vaccine1', CURRENT_DATE, 1, 'vaccine1.jpg'),
--     ('Vaccine2', CURRENT_DATE, 2, 'vaccine2.jpg'),
--     ('Vaccine3', CURRENT_DATE, 3, 'vaccine3.jpg'),
--     ('Vaccine4', CURRENT_DATE, 4, 'vaccine4.jpg'),
--     ('Vaccine5', CURRENT_DATE, 5, 'vaccine5.jpg');