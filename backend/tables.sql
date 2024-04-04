CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    age INT,
    grade_level VARCHAR(25),
    role VARCHAR(20),
    status VARCHAR(20),
    password_reset_token VARCHAR(255),
    password_reset_token_expires DATE
);

CREATE TABLE IF NOT EXISTS Topics (
    topic_id INT PRIMARY KEY AUTO_INCREMENT,
    topic_name VARCHAR(50) 
    grade_level VARCHAR(10) 
);

CREATE TABLE IF NOT EXISTS Operations (
    operation_id INT PRIMARY KEY AUTO_INCREMENT,
    operation_name VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS Results (
    results_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    topic_id INT,
    operation_id INT,
    number_of_questions INT,
    number_correct INT,
    time_to_finish TIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (topic_id) REFERENCES Topics(topic_id),
    FOREIGN KEY (operation_id) REFERENCES Operations(operation_id)
);

INSERT INTO Users
    (first_name, last_name, email, password, age, grade_level, role, status) 
VALUES
    ('Jane', 'Doe',  'jane_doe@example.com', 'password', 8, '4th grade', 'student', 'true'),
    ('John', 'Smith',  'admin@example.com', 'password', null, null, 'admin', 'true');

UPDATE Users
SET password = '1234567890'
WHERE user_id = 1;

UPDATE Users
SET status = 'true',
    role = 'student'
WHERE user_id = 1;

UPDATE Users
SET status = 'true',
    role = 'admin'
WHERE user_id = 2;


INSERT INTO Topics
    (topic_id, topic_name, grade_level )
VALUES
    (1, 'Addition', '4th_grade' ),
    (2, 'Addition', '5th_grade' ),
    (3, 'Addition', '6th_grade' ),
    (4, 'Subtraction', '4th_grade' ),
    (5, 'Subtraction', '5th_grade' ),
    (6, 'Subtraction', '6th_grade' ),
    (7, 'Multiplication', '4th_grade' ),
    (8, 'Multiplication', '5th_grade' ),
    (9, 'Multiplication', '6th_grade' ),
    (10, 'Division', '4th_grade' ),
    (11, 'Division', '5th_grade' ),
    (12, 'Division', '6th_grade' );
