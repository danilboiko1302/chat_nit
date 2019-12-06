<?php 

define('LOGIN', 'user');
define('PASS', 'user');


// Сервер, логин, пароль, название БД
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'chat');

/**
* Types (Шаблоны для работы с SQL запросами)
*/

define("SELECT", "SELECT * FROM ");
define("INSERT", "INSERT INTO ");
define("DELETE", "DELETE FROM ");
define("WHERE", " WHERE id = ");

define("Table", "messages"); // Название таблицы в БД с сообщениями

?>