-- Users table
CREATE TABLE users
(
    id BIGINT
    AUTO_INCREMENT NOT NULL,
    name            VARCHAR
    (255) NOT NULL,
    email           VARCHAR
    (255) NOT NULL UNIQUE,
    password        VARCHAR
    (255) NOT NULL,
    current_score   INT NOT NULL DEFAULT 0,  -- tracks total points
    CONSTRAINT `PRIMARY` PRIMARY KEY
    (id)
);

-- Categories table
CREATE TABLE categories
(
    id TINYINT AUTO_INCREMENT NOT NULL,
    name   VARCHAR
    (255) NOT NULL,
CONSTRAINT `PRIMARY` PRIMARY KEY
    (id)
);

        -- Flashcards table
        CREATE TABLE flashcards
        (
            id BIGINT
            AUTO_INCREMENT NOT NULL,
    user_id     BIGINT NOT NULL,             -- owner of the flashcard
    category_id TINYINT NOT NULL,            -- category of the flashcard
    question    VARCHAR
            (255) NOT NULL,
    answer      VARCHAR
            (255) NOT NULL,
    difficulty  TINYINT NOT NULL DEFAULT 1,  -- 1=easy, 2=medium, 3=hard
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
            UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PRIMARY` PRIMARY KEY
            (id)
);

            -- Scores table
            CREATE TABLE scores
            (
                id BIGINT
                AUTO_INCREMENT NOT NULL,
    user_id      BIGINT NOT NULL,
    flashcard_id BIGINT NOT NULL,
    points       INT NOT NULL DEFAULT 0,
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `PRIMARY` PRIMARY KEY
                (id)
);

                -- Foreign key constraints
                ALTER TABLE flashcards
    ADD CONSTRAINT fk_flashcards_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

                ALTER TABLE flashcards
    ADD CONSTRAINT fk_flashcards_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;

                ALTER TABLE scores
    ADD CONSTRAINT fk_scores_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

                ALTER TABLE scores
    ADD CONSTRAINT fk_scores_flashcard FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE;

                -- Indexes for faster queries
                CREATE INDEX idx_flashcards_user ON flashcards(user_id);
                CREATE INDEX idx_flashcards_category ON flashcards(category_id);
                CREATE INDEX idx_scores_user ON scores(user_id);
                CREATE INDEX idx_scores_flashcard ON scores(flashcard_id);

                -- Trigger to update user's current_score automatically on new score entry
                DELIMITER //
                CREATE TRIGGER trg_update_user_score AFTER
                INSERT ON
                scores
                FOR
                EACH
                ROW
                BEGIN
                    UPDATE users
    SET current_score = current_score + NEW.points
    WHERE id = NEW.user_id;
                END;
                //
DELIMITER ;
