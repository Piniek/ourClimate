<?php
    $db_connection = array();
	
	$local = 1; // change this to go back and forth between local
	
	if($local)
	{
		$db_connection['host'] = "localhost";
		$db_connection['username'] = "root"; // Change this to your user
		$db_connection['password'] = ""; // randomly generated (previously cs546)
		$db_connection['database'] = "ourclimate"; // randomly generated
	}
	else 
	{
		$db_connection['host'] = "localhost";
		$db_connection['username'] = "rand9382_climate"; // Change this to your user
		$db_connection['password'] = "D*&Q8F;MF6NDTe]Vw4"; // randomly generated (previously cs546)
		$db_connection['database'] = "rand9382_ourclimate"; // randomly generated
	}
?>
