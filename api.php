<?php 

require 'config/db.php'; 

class Chat
{

	private static function login()
	{
		$data = json_decode($_POST['data']); 

		if($data->login == LOGIN && $data->pass == PASS) 
		{
			echo 'ok'; 
		}
	}

	private static function getList()
	{
		$res = Db::getData(Table); 

		if($res == null) 
			$res = []; 

		echo json_encode($res); 
	}

	private static function addMess()
	{
		$data = json_decode($_POST['data']); 

		$username = addslashes(htmlspecialchars($data->username)); 
		$message = addslashes(htmlspecialchars($data->message)); 
		$reg_date = addslashes(htmlspecialchars($data->reg_date)); 

		$sql = " SET username = '$username', message = '$message', reg_date = '$reg_date' "; 
		$res = Db::setData(INSERT, Table . $sql); 

		echo $res; 
	}

	private static function removeMess() 
	{
		$data = json_decode($_POST['data']); 

		$id = addslashes(htmlspecialchars($data->id)); 

		$res = Db::setData(DELETE, Table . WHERE . $id);

		echo $res; 
	}

	public static function init()
	{
		
		if(isset($_POST['type'])) 
		{
			switch ($_POST['type']) {
				case 'login': self::login(); break; 
				case 'list': self::getList(); break;
				case 'add': self::addMess(); break; 
				case 'remove': self::removeMess(); break; 
			
			}
		}
		
	}
}

Chat::init(); 



?>