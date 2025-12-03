-- Create languages table
CREATE TABLE languages
(
    id TINYINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    native_name VARCHAR(100),
    CONSTRAINT PK_languages PRIMARY KEY (id)
);

-- INSERT DEFAULT LANGUAGES
INSERT INTO languages (code, name, native_name) VALUES
    ('en', 'English', 'English'),
    ('es', 'Spanish', 'Español'),
    ('fr', 'French', 'Français'),
    ('de', 'German', 'Deutsch'),
    ('zh-Hant', 'Chinese (Traditional)', '中文（繁體）'),
    ('zh-Hans', 'Chinese (Simplified)', '中文（简体）'),
    ('ja', 'Japanese', '日本語'),
    ('ko', 'Korean', '한국어');

-- Add language_id column to flashcards table (nullable temporarily)
ALTER TABLE flashcards
    ADD COLUMN language_id TINYINT NULL;

UPDATE flashcards
    SET flashcards.language_id = 5
    WHERE category_id IN (1, 2, 3);

UPDATE flashcards
    SET flashcards.language_id = 1
    WHERE category_id = 4;

ALTER TABLE flashcards
    MODIFY COLUMN language_id TINYINT NOT NULL;

-- Add foreign key constraint for flashcards.language_id
ALTER TABLE flashcards
    ADD CONSTRAINT fk_flashcards_language
        FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE;

-- Create index for flashcards.language_id
CREATE INDEX idx_flashcards_language ON flashcards(language_id);

-- Add default_language_id column to users table (nullable to allow SET NULL on delete)
ALTER TABLE users
    ADD COLUMN default_language_id TINYINT NULL DEFAULT 2;  -- English

-- Add foreign key constraint for users.default_language_id
ALTER TABLE users
    ADD CONSTRAINT fk_users_default_language
        FOREIGN KEY (default_language_id) REFERENCES languages(id) ON DELETE SET NULL;

-- Create index for users.default_language_id
CREATE INDEX idx_users_default_language ON users(default_language_id);