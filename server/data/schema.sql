DROP TABLE IF EXISTS "vaccine";
DROP TABLE IF EXISTS "daycare_plan";
DROP TABLE IF EXISTS "medication";
DROP TABLE IF EXISTS "pets";
DROP TABLE IF EXISTS "users";
CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
CREATE TABLE "pets"(
    "id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "breed" VARCHAR(255) NOT NULL,
    "birthdate" DATE NOT NULL,
    "profile_picture" VARCHAR(255),
    CONSTRAINT "pets_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE TABLE "medication"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "time_of_day" DATE NOT NULL,
    "with_food" BOOLEAN NOT NULL,
    "pet_id" BIGINT NOT NULL,
    CONSTRAINT "medication_pet_id_foreign" FOREIGN KEY("pet_id") REFERENCES "pets"("id")
);
CREATE TABLE "daycare_plan"(
    "id" SERIAL PRIMARY KEY,
    "pet_id" BIGINT NOT NULL,
    "food" VARCHAR(255) NULL,
    "walks" BIGINT NULL,
    CONSTRAINT "daycare_plan_pet_id_foreign" FOREIGN KEY("pet_id") REFERENCES "pets"("id")
);
CREATE TABLE "vaccine"(
    "Vaccine" VARCHAR(255) NOT NULL,
    "Date Issued" DATE NOT NULL,
    "pet_id" BIGINT NOT NULL,
    "Image" VARCHAR(255) NOT NULL,
    CONSTRAINT "vaccine_pet_id_foreign" FOREIGN KEY("pet_id") REFERENCES "pets"("id"),
    PRIMARY KEY("Vaccine")
);