USE planner_db;

-- tables for the community page --
CREATE TABLE blogs (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
    body VARCHAR(300) NOT NULL,
	user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE feed (
    id INT NOT NULL AUTO_INCREMENT,
    goal VARCHAR(100),
	user_id INT NOT NULL,
    blog_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES users(id)
    FOREIGN KEY(blog_id) REFERENCES blogs(id)
);

-- tables for goals page --
CREATE TABLE goals (
  id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name varchar(100) NOT NULL,
  goals_text varchar(100),
  completed BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY() REFERENCES 
);


-- tables for planner page --
CREATE TABLE notes (
	id INT NOT NULL AUTO_INCREMENT,
	note VARCHAR(300) NOT NULL,
	user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- tables for dashboard page --