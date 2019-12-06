<?php 

require __DIR__ . '/config.php'; 

class Db
{
	private static $link;
	
	private static function connectDB()
	{
		self::$link = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

		if(self::$link->connect_error)
		{
			echo self::$link->connect_error;
		}
		else
		{
			self::$link->query("SET NAMES 'utf8' COLLATE 'utf8_general_ci'");
			self::$link->query("SET CHARACTER SET 'utf8'");
		}
	}

	public static function getData($param)
	{
		self::connectDB();

		$sql = SELECT . $param;

		$sql = self::$link->query($sql);

		$i = 0; while($row = $sql->fetch_object())
				{
					$response[] = $row;
				}
		return $response;
	}

	public static function setData($type, $param) 
	{
		self::connectDB();

		$sql = $type . $param;

		$response = self::$link->query($sql);

		return $response;
	}
}



?>