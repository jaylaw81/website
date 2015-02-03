<?php
include($_SERVER['DOCUMENT_ROOT'] . '/assets/resources/config.php');
include($_SERVER['DOCUMENT_ROOT'] . '/assets/resources/lib/functions.php');
include($_SERVER['DOCUMENT_ROOT'] . '/assets/resources/lib/swift/swift_required.php');
$name = mysql_real_escape_string($_POST['name']);
if(empty($name)) {
    header("location: ../../contact-rhinocoders/?upd=f")
}
$email = mysql_real_escape_string($_POST['email']);
if(empty($email)) {
    header("location: ../../contact-rhinocoders/?upd=f")
}
$mess = mysql_real_escape_string($_POST['mess']);
if(empty($mess)) {
    header("location: ../../contact-rhinocoders/?upd=f")
}
$info = array(
    'name' => $name,
    'email' => $email,
    'mess' => $mess
);
send_contact($info);
?>
