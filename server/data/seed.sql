-- Inserting users
INSERT INTO "users"("name", "email", "password")
VALUES (
        'John Doe',
        'john.doe@example.com',
        'password123'
    ),
    (
        'Jane Smith',
        'jane.smith@example.com',
        'password456'
    ),
    (
        'Mike Johnson',
        'mike.johnson@example.com',
        'password789'
    );
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
VALUES ('Med1', '2 pills', CURRENT_DATE, true, 1),
    ('Med2', '1 pill', CURRENT_DATE, false, 2),
    ('Med3', '3 pills', CURRENT_DATE, true, 3),
    ('Med4', '1 pill', CURRENT_DATE, false, 4),
    ('Med5', '2 pills', CURRENT_DATE, true, 5);
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
        'Food1',
        'Morning, Afternoon',
        true,
        true,
        true,
        'Twice a day'
    ),
    (
        2,
        'Food2',
        'Morning, Evening',
        false,
        true,
        false,
        'Once a day'
    ),
    (
        3,
        'Food3',
        'Afternoon, Evening',
        true,
        false,
        true,
        'Twice a day'
    ),
    (
        4,
        'Food4',
        'Morning, Afternoon, Evening',
        true,
        true,
        false,
        'Three times a day'
    ),
    (
        5,
        'Food5',
        'Morning, Evening',
        false,
        false,
        true,
        'Once a day'
    );
-- Inserting vaccine for each pet
INSERT INTO "vaccine"("Vaccine", "Date Issued", "pet_id", "Image")
VALUES ('Vaccine1', CURRENT_DATE, 1, 'vaccine1.jpg'),
    ('Vaccine2', CURRENT_DATE, 2, 'vaccine2.jpg'),
    ('Vaccine3', CURRENT_DATE, 3, 'vaccine3.jpg'),
    ('Vaccine4', CURRENT_DATE, 4, 'vaccine4.jpg'),
    ('Vaccine5', CURRENT_DATE, 5, 'vaccine5.jpg');