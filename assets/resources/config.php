<?php
$host = "localhost";
$dbname = "";
$user = "";
$pass = "";
$conn = mysql_connect($host, $user, $pass) or die("MYSQL ERROR");
$select_db = mysql_select_db($dbname) or die("Could not select db!");
?>