CREATE TABLE IF NOT EXISTS `moment_label`(
moment_id INT NOT NULL,
label_id INT NOT NULL,
createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(moment_id,label_id),
FOREIGN KEY(moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(label_id) REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;

INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);

SELECT l.id labelID, l.name labelName
FROM moment_label ml
LEFT JOIN label l ON l.id=ml.label_id
WHERE moment_id = ?;
