ALTER TABLE nodes ADD COLUMN identity_kind TEXT;
ALTER TABLE nodes ADD COLUMN display_name_override TEXT;
ALTER TABLE nodes ADD COLUMN public_name_mode TEXT;

ALTER TABLE nodes ADD COLUMN person_first_name TEXT;
ALTER TABLE nodes ADD COLUMN person_middle_names TEXT;
ALTER TABLE nodes ADD COLUMN person_last_name TEXT;
ALTER TABLE nodes ADD COLUMN person_nickname TEXT;
ALTER TABLE nodes ADD COLUMN person_honorific TEXT;
ALTER TABLE nodes ADD COLUMN person_descriptor TEXT;

ALTER TABLE nodes ADD COLUMN show_person_middle_names INTEGER;
ALTER TABLE nodes ADD COLUMN show_person_last_name INTEGER;
ALTER TABLE nodes ADD COLUMN show_person_nickname INTEGER;
ALTER TABLE nodes ADD COLUMN show_person_honorific INTEGER;
ALTER TABLE nodes ADD COLUMN show_person_descriptor INTEGER;
ALTER TABLE nodes ADD COLUMN prefer_person_nickname INTEGER;

ALTER TABLE nodes ADD COLUMN animal_name TEXT;
ALTER TABLE nodes ADD COLUMN animal_registered_name TEXT;
ALTER TABLE nodes ADD COLUMN animal_nickname TEXT;
ALTER TABLE nodes ADD COLUMN animal_species TEXT;
ALTER TABLE nodes ADD COLUMN animal_breed TEXT;

ALTER TABLE nodes ADD COLUMN show_animal_registered_name INTEGER;
ALTER TABLE nodes ADD COLUMN show_animal_nickname INTEGER;
ALTER TABLE nodes ADD COLUMN show_animal_species INTEGER;
ALTER TABLE nodes ADD COLUMN show_animal_breed INTEGER;
ALTER TABLE nodes ADD COLUMN prefer_animal_nickname INTEGER;
