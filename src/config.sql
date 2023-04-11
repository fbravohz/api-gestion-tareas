CREATE TABLE `defaultdb`.`task` (
  `idtask` INT NOT NULL AUTO_INCREMENT,
  `testColumn` VARCHAR(45) NULL,
  PRIMARY KEY (`idtask`));

INSERT INTO `defaultdb`.`task` (`testColumn`) VALUES ('Test!');

ALTER USER 'doadmin' IDENTIFIED WITH mysql_native_password BY 'AVNS_09rA6ACSEgJHOFjf-fV';

INSERT INTO `defaultdb`.`task` (`testColumn`) VALUES ('Test2!');

ALTER TABLE `defaultdb`.`task`
ADD COLUMN `description` VARCHAR(256) NOT NULL AFTER `title`,
ADD COLUMN `status` TINYINT(1) NOT NULL AFTER `description`,
ADD COLUMN `comment` VARCHAR(256) NULL AFTER `status`,
ADD COLUMN `id_responsible` VARCHAR(45) NULL AFTER `comment`,
ADD COLUMN `tags` VARCHAR(45) NULL AFTER `id_responsible`,
CHANGE COLUMN `idtask` `id_task` INT NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `testColumn` `title` VARCHAR(45) NOT NULL ;

CREATE TABLE `defaultdb`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user`));

  ALTER TABLE `defaultdb`.`task`
CHANGE COLUMN `id_responsible` `id_responsible` INT NULL DEFAULT NULL ;

INSERT INTO `defaultdb`.`user` (`username`, `password`) VALUES ('admin', 'admin');

UPDATE `defaultdb`.`task` SET `description` = 'desc1', `id_responsible` = '1' WHERE (`id_task` = '1');
UPDATE `defaultdb`.`task` SET `description` = 'desc2', `id_responsible` = '1' WHERE (`id_task` = '2');

ALTER TABLE `defaultdb`.`task`
ADD INDEX `task_user_idx` (`id_responsible` ASC) VISIBLE;
;
ALTER TABLE `defaultdb`.`task`
ADD CONSTRAINT `task_user`
  FOREIGN KEY (`id_responsible`)
  REFERENCES `defaultdb`.`user` (`id_user`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

SELECT id_task, title, description, status, comment, username as responsible, tags
FROM task
INNER JOIN user
ON task.id_task = 1
AND task.id_responsible = user.id_user;


ALTER TABLE `defaultdb`.`task` 
DROP FOREIGN KEY `task_user`;
ALTER TABLE `defaultdb`.`task` 
DROP INDEX `task_user_idx` ;
;

ALTER TABLE `defaultdb`.`task` 
DROP COLUMN `id_responsible`,
ADD COLUMN `responsible` INT NULL AFTER `comment`;