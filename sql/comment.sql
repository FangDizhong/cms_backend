CREATE TABLE IF NOT EXISTS `comment`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  comment VARCHAR(1000) NOT NULL,
  moment_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_id INT DEFAULT NULL,

  FOREIGN KEY(moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(comment_id) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE comment
ADD COLUMN (
createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO comment (content, moment_id, user_id,comment_id) VALUES (?,?,?,?);

SELECT
  c.id, c.content,c.comment_id commentID, c.createAt,c.updateAt,
  JSON_OBJECT('id',u.id,'name',u.name) user
FROM comment c
LEFT JOIN user u ON u.id=c.user_id
WHERE moment_id = ?;

UPDATE comment SET content = ? WHERE id = ?;

DELETE FROM comment WHERE id = ?;
