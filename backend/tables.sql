CREATE TABLE IF NOT EXISTS Users  (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    age INT,
    grade_level VARCHAR(25),
    role varchar(20),
    status varchar(20),
    password_reset_token VARCHAR(255),
    password_reset_token_expires DATE
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS Topics (
    topic_id INT PRIMARY KEY AUTO_INCREMENT,
    topic_name VARCHAR(50),
    UNIQUE (topic_name)
);

CREATE TABLE IF NOT EXISTS Operations (
    operation_id INT PRIMARY KEY AUTO_INCREMENT,
    operation_name VARCHAR(50),
    UNIQUE (operation_name)
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

insert into users
    (first_name, last_name, email, password, age, grade_level, status, role) 
values
    ('Jane', 'Doe',  'jane_doe@example.com', 'password', 8, '4th grade', 'student', 'true');
    ('John', 'Smith',  'admin@example.com', 'password', , '', 'admin', 'true');

insert into users
    (first_name, last_name, email, password, status, role) 
values
    ('John', 'Smith',  'admin@example.com', password, 'admin', 'true');

ALTER TABLE Users
DROP COLUMN age,
DROP COLUMN grade_level,
DROP COLUMN role,
DROP COLUMN status;

ALTER TABLE Users
ADD COLUMN password VARCHAR(255),
ADD COLUMN age INT,
ADD COLUMN grade_level VARCHAR(25),
ADD COLUMN role VARCHAR(20),
ADD COLUMN status VARCHAR(20);

UPDATE Users
SET password = '1234567890'
WHERE user_id = 1;

ALTER TABLE Users
ADD COLUMN passwordRestToken VARCHAR(255),
ADD passwordRestTokenExpire DATE;

ALTER TABLE Users
DROP COLUMN passwordRestToken,
DROP COLUMN passwordRestTokenExpire;
