-- Populate Categories
INSERT INTO categories
    (name)
VALUES
    ('Visiting the Doctor'),
    ('Small Talk at Work'),
    ('Traveling / Asking for Directions'),
    ('Idiomatic Expressions / Slang');

-- Sample Users
INSERT INTO users
    (name, email, password)
VALUES
    ('Alice', 'alice@example.com', 'password123'),
    ('Bob', 'bob@example.com', 'password123');

-- Category 1: Visiting the Doctor (Chinese → English)
INSERT INTO flashcards
    (user_id, category_id, question, answer, difficulty)
VALUES
    (1, 1, '我头疼', 'I have a headache', 1),
    (1, 1, '我发烧了', 'I have a fever', 1),
    (1, 1, '我咳嗽', 'I am coughing', 1),
    (1, 1, '喉咙痛', 'Sore throat', 1),
    (1, 1, '我过敏', 'I am allergic', 2),
    (1, 1, '急性支气管炎', 'Acute bronchitis', 3),
    (1, 1, '慢性胃炎', 'Chronic gastritis', 3),
    (1, 1, '我晕倒了', 'I fainted', 2),
    (1, 1, '呼吸困难', 'Difficulty breathing', 3),
    (1, 1, '心律不齐', 'Arrhythmia', 3),
    (1, 1, '我需要检查血压', 'I need a blood pressure check', 2),
    (1, 1, '手术需要麻醉', 'Surgery requires anesthesia', 3),
    (1, 1, '我有慢性疾病', 'I have a chronic illness', 2),
    (1, 1, '体检', 'Medical examination', 2),
    (1, 1, '处方', 'Prescription', 2),
    (1, 1, '注射疫苗', 'Vaccination', 2),
    (1, 1, '血糖过高', 'High blood sugar', 3),
    (1, 1, '化验结果出来了吗？', 'Are the lab results ready?', 2),
    (1, 1, '症状加重', 'Symptoms worsening', 3),
    (1, 1, '康复期', 'Recovery period', 3);

-- Category 2: Small Talk at Work (Chinese → English)
INSERT INTO flashcards
    (user_id, category_id, question, answer, difficulty)
VALUES
    (1, 2, '早上好', 'Good morning', 1),
    (1, 2, '你周末过得怎么样？', 'How was your weekend?', 1),
    (1, 2, '今天忙吗？', 'Are you busy today?', 1),
    (1, 2, '最近怎么样？', 'How have you been?', 1),
    (1, 2, '项目进展如何？', 'How is the project progressing?', 2),
    (1, 2, '我需要你的反馈', 'I need your feedback', 2),
    (1, 2, '会议延期了', 'The meeting was postponed', 2),
    (1, 2, '截止日期快到了', 'The deadline is approaching', 2),
    (1, 2, '预算超支', 'Over budget', 3),
    (1, 2, '团队协作需要改进', 'Team collaboration needs improvement', 3),
    (1, 2, '你能提供技术支持吗？', 'Can you provide technical support?', 2),
    (1, 2, '我有一个建议', 'I have a suggestion', 1),
    (1, 2, '我们需要优化流程', 'We need to optimize the process', 3),
    (1, 2, '这个方案可行吗？', 'Is this plan feasible?', 2),
    (1, 2, '你完成任务了吗？', 'Did you complete the task?', 2),
    (1, 2, '我有一个问题', 'I have a question', 1),
    (1, 2, '报告需要修改', 'The report needs revision', 2),
    (1, 2, '资源有限', 'Resources are limited', 3),
    (1, 2, '会议纪要', 'Meeting minutes', 2),
    (1, 2, '提升效率', 'Increase efficiency', 3);

-- Category 3: Traveling / Asking for Directions (Chinese → English)
INSERT INTO flashcards
    (user_id, category_id, question, answer, difficulty)
VALUES
    (1, 3, '车站', 'Train station', 1),
    (1, 3, '机场', 'Airport', 1),
    (1, 3, '火车', 'Train', 1),
    (1, 3, '公交车', 'Bus', 1),
    (1, 3, '出租车', 'Taxi', 1),
    (1, 3, '左转', 'Turn left', 2),
    (1, 3, '右转', 'Turn right', 2),
    (1, 3, '直走', 'Go straight', 2),
    (1, 3, '前面', 'Ahead', 2),
    (1, 3, '附近', 'Nearby', 2),
    (1, 3, '问路', 'Ask for directions', 2),
    (1, 3, '换乘', 'Transfer', 3),
    (1, 3, '旅馆', 'Hotel', 2),
    (1, 3, '住宿预订', 'Accommodation reservation', 3),
    (1, 3, '航班延误', 'Flight delay', 3),
    (1, 3, '登机口', 'Boarding gate', 2),
    (1, 3, '行李托运', 'Checked luggage', 3),
    (1, 3, '旅行保险', 'Travel insurance', 3),
    (1, 3, '旅游景点', 'Tourist attraction', 2),
    (1, 3, '导游', 'Tour guide', 2);

-- Category 4: Idiomatic Expressions / Slang (English → English)
INSERT INTO flashcards
    (user_id, category_id, question, answer, difficulty)
VALUES
    (1, 4, 'Break a leg', 'Good luck', 1),
    (1, 4, 'Piece of cake', 'Very easy', 1),
    (1, 4, 'Hit the sack', 'Go to sleep', 1),
    (1, 4, 'Let the cat out of the bag', 'Reveal a secret', 2),
    (1, 4, 'Bite the bullet', 'Face a difficult situation', 2),
    (1, 4, 'Costs an arm and a leg', 'Very expensive', 2),
    (1, 4, 'Under the weather', 'Feeling sick', 1),
    (1, 4, 'Once in a blue moon', 'Rarely', 2),
    (1, 4, 'Cut corners', 'Do something poorly to save time', 2),
    (1, 4, 'The ball is in your court', 'It’s your decision', 2),
    (1, 4, 'Hit the nail on the head', 'Exactly right', 2),
    (1, 4, 'Burn the midnight oil', 'Work late', 2),
    (1, 4, 'Kick the bucket', 'Die', 3),
    (1, 4, 'Pull someone’s leg', 'Joke with someone', 1),
    (1, 4, 'Spill the beans', 'Reveal a secret', 2),
    (1, 4, 'Barking up the wrong tree', 'Blaming the wrong person', 3),
    (1, 4, 'Up in the air', 'Uncertain', 2),
    (1, 4, 'Hit the books', 'Study hard', 2),
    (1, 4, 'Face the music', 'Accept consequences', 2),
    (1, 4, 'Wrap your head around', 'Understand something complicated', 3);