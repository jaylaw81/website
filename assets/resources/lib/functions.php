<?php
//***************************// FORMAT FUNCTIONS//***************************//

//***************************
// Format CONTACT email function
//***************************
function format_contact($info, $format){

	//set the root
	$root = $_SERVER['DOCUMENT_ROOT'].'/';

	//grab the template content
	$template = file_get_contents( $_SERVER['DOCUMENT_ROOT']. '/assets/resources/templates/contactemail.'.$format);

	//replace all the tags
	$template = preg_replace('{NAME}', $info['name'], $template);
	$template = preg_replace('{EMAIL}', $info['email'], $template);
	$template = preg_replace('{MESSAGE}', $info['message'], $template);

	//return the html of the template
	return $template;
}

//***************************// SEND FUNCTIONS//***************************//

//***************************
// Send CONTACT email function
//***************************
function send_contact($info){

	//format each email
	$body = format_contact($info,'php');
	$body_plain_txt = format_contact($info,'txt');

	//setup the mailer
	$transport = Swift_MailTransport::newInstance();
	$mailer = Swift_Mailer::newInstance($transport);
	$message = Swift_Message::newInstance();
	$message ->setSubject('New Contact Email!');
	$message ->setFrom(array('noreply@rhinocoders.com' => 'RhinoCoders | New Contact'));
	$message ->setTo(array('mtrueblood@sapient.com' => 'mtrueblood@sapient.com'));
	$message ->setBody($body_plain_txt);
	$message ->addPart($body, 'text/html');
	$result = $mailer->send($message);
	return $result;
}

//***************************
//cleanup the errors
//***************************
function show_errors($action){
	$error = false;
	if(!empty($action['result'])){
		$error = "<ul class=\"alert $action[result]\">"."\n";
		if(is_array($action['text'])){

			//loop out each error
			foreach($action['text'] as $text){
				$error .= "<li><p>$text</p></li>"."\n";
			}
		}else{
			//single error
			$error .= "<li><p>$action[text]</p></li>";
		}
		$error .= "</ul>"."\n";
	}
	return $error;
}

?>
