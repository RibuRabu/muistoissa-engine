ALTER TABLE nodes ADD COLUMN show_epitaph INTEGER DEFAULT 1;
ALTER TABLE nodes ADD COLUMN show_memory_text INTEGER DEFAULT 1;
ALTER TABLE nodes ADD COLUMN show_life_story INTEGER DEFAULT 1;
ALTER TABLE nodes ADD COLUMN show_identity_details INTEGER DEFAULT 0;
ALTER TABLE nodes ADD COLUMN identity_details_position TEXT DEFAULT 'below_name';
