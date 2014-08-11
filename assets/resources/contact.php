<? require_once('lib/functions.php');
$name = mysql_real_escape_string($_POST['name']);
$email = mysql_real_escape_string($_POST['email']);
$message = mysql_real_escape_string($_POST['message']);

//echo "$name, $email, $message";

require_once('lib/swift/swift_required.php');
$info = array(
	'name' => $name,
	'email' => $email,
	'message' => $message);
send_contact($info); ?>