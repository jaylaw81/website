<?php
    include($_SERVER['DOCUMENT_ROOT'] . '/assets/resources/config.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/assets/resources/lib/functions.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/assets/resources/lib/swift/swift_required.php');
    $name = mysql_real_escape_string($_POST['name']);
    $email = mysql_real_escape_string($_POST['email']);
    $mess = mysql_real_escape_string($_POST['mess']);
    $info = array(
        'name' => $name,
        'email' => $email,
        'mess' => $mess
    );
    send_contact($info);
?>
