CREATE TABLE IF NOT EXISTS `moment`(
id INT PRIMARY KEY AUTO_INCREMENT,
content VARCHAR(1000) NOT NULL,
user_id INT NOT NULL,
createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO moment (content,user_id) VALUES (?,?);

# get detail
SELECT
  m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
  JSON_OBJECT('id',u.id,'name',u.name) author
FROM moment m
LEFT JOIN user u ON m.user_id = u.id
WHERE m.id = ?;

# get list
SELECT
  m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
  JSON_OBJECT('id',u.id,'name',u.name) author,
  (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
  (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
FROM moment m
LEFT JOIN user u ON m.user_id = u.id
Limit ?,?;

SELECT * FROM moment WHERE id = ? AND user_id = ?;

UPDATE moment SET content = ? WHERE id = ?;

DELETE FROM moment WHERE id = ?;
