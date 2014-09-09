<?php
$host = "localhost";
$dbname = "test";
$user = "root";
$pass = "nitrobham2014mysql";
$conn = mysql_connect($host, $user, $pass) or die("MYSQL ERROR");
$select_db = mysql_select_db($dbname) or die("Could not select db!");
?>