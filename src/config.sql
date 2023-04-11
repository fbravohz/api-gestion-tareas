CREATE TABLE `defaultdb`.`task` (
  `idtask` INT NOT NULL AUTO_INCREMENT,
  `testColumn` VARCHAR(45) NULL,
  PRIMARY KEY (`idtask`));

INSERT INTO `defaultdb`.`task` (`testColumn`) VALUES ('Test!');

ALTER USER 'doadmin' IDENTIFIED WITH mysql_native_password BY 'AVNS_09rA6ACSEgJHOFjf-fV';

INSERT INTO `defaultdb`.`task` (`testColumn`) VALUES ('Test2!');