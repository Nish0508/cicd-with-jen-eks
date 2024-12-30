-- db user called "test" and no password

CREATE USER 'test'@'%' IDENTIFIED BY 'hellotest';

GRANT ALL PRIVILEGES ON mentalyc .* TO 'test'@'%';
FLUSH PRIVILEGES;