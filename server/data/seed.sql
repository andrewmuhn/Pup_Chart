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
INSERT INTO "pets"("user_id", "breed", "profile_picture")
VALUES (1, 'Labrador', 'labrador.jpg'),
    (1, 'Bulldog', 'bulldog.jpg'),
    (2, 'Poodle', 'poodle.jpg'),
    (3, 'Beagle', 'beagle.jpg'),
    (3, 'Rottweiler', 'rottweiler.jpg');
-- Inserting medication for each pet
INSERT INTO "medication"("name", "time_of_day", "with_food", "pet_id")
VALUES ('Med1', CURRENT_DATE, true, 1),
    ('Med2', CURRENT_DATE, false, 2),
    ('Med3', CURRENT_DATE, true, 3),
    ('Med4', CURRENT_DATE, false, 4),
    ('Med5', CURRENT_DATE, true, 5);
-- Inserting daycare_plan for each pet
INSERT INTO "daycare_plan"("pet_id", "food", "walks")
VALUES (1, 'Food1', 2),
    (2, 'Food2', 3),
    (3, 'Food3', 1),
    (4, 'Food4', 2),
    (5, 'Food5', 3);
-- Inserting vaccine for each pet
INSERT INTO "vaccine"("Vaccine", "Date Issued", "pet_id", "Image")
VALUES ('Vaccine1', CURRENT_DATE, 1, 'vaccine1.jpg'),
    ('Vaccine2', CURRENT_DATE, 2, 'vaccine2.jpg'),
    ('Vaccine3', CURRENT_DATE, 3, 'vaccine3.jpg'),
    ('Vaccine4', CURRENT_DATE, 4, 'vaccine4.jpg'),
    ('Vaccine5', CURRENT_DATE, 5, 'vaccine5.jpg');