<?php

$consumer_key = 'fZgumnabH46VUzVdK9YrX2Dy5';
$consumer_secret = 'dEMpGUVMTtqmSGIflN5SFgNH8BWhlTEqpiMvyXe2IoCbhz9DZm';
$url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rhinocoders&count=2";

// Get the Twitter access token
$access_token = get_twitter_access_token($consumer_key, $consumer_secret, $use_curl);

 // Set up the headers that will be used to make a call to the URL including the app name and the access token
 $headers = array(
  "GET /oauth2/token HTTP/1.1",
  "Host: api.twitter.com",
  "User-Agent: ThinkTwit Twitter App v" . '',
  "Authorization: Bearer " . $access_token,
  "Content-Type: application/x-www-form-urlencoded;charset=UTF-8",
 );

 // Initiate a CURL object
 $ch = curl_init();

 // Set the URL
 curl_setopt($ch, CURLOPT_URL, $url);

 // Set the headers we created
 curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

 // Set option to not receive the headers
 $header = curl_setopt($ch, CURLOPT_HEADER, 0);

 // Set to return a string
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

 // Set the timeout
 curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

 // Execute the API call
 $feed = curl_exec($ch);
 echo(curl_error($ch));
 // Close the CURL object
 curl_close($ch);

 if(!empty($feed))
    //var_dump($feed);
    echo $feed;
else
    echo('empty');

 function get_twitter_access_token($consumer_key, $consumer_secret) {
     // Url encode the consumer_key and consumer_secret in accordance with RFC 1738
     $encoded_consumer_key = urlencode($consumer_key);
     $encoded_consumer_secret = urlencode($consumer_secret);

     // Concatenate encoded consumer, a colon character and the encoded consumer secret
     $bearer_token = $encoded_consumer_key . ':' . $encoded_consumer_secret;

     // Base64-encode bearer token
     $base64_encoded_bearer_token = base64_encode($bearer_token);

     // Twitter URL that authenticates bearer tokens
     $url = "https://api.twitter.com/oauth2/token/";

      // Set up the headers that will be used to make a call to the URL including the app name and the encoded bearer token
      $headers = array(
       "POST /oauth2/token HTTP/1.1",
       "Host: api.twitter.com",
       "User-Agent: ThinkTwit Twitter App v" . '',
       "Authorization: Basic " . $base64_encoded_bearer_token,
       "Content-Type: application/x-www-form-urlencoded;charset=UTF-8",
       "Content-Length: 29"
      );

      // Setup curl
      $ch = curl_init();

      // Set the URL
      curl_setopt($ch, CURLOPT_URL, $url);

      // Set the headers we created
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

      // Set option to not receive the headers
      $header = curl_setopt($ch, CURLOPT_HEADER, 0);

      // Set to use a POST call
      curl_setopt($ch, CURLOPT_POST, 1);

      // Set the parameter to be sent (see
      curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

      // Set to return a string
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

      // Execute the call
      $response = curl_exec($ch);

      // Close curl
      curl_close($ch);

     // Decode the returned JSON response
     $json = json_decode($response, true);


     // Verify that the token is a bearer (by checking for errors first and then checking that the type is bearer)
     if (!isset($json["errors"]) && $json["token_type"] == 'bearer') {
      // If so then return the access token
      return $json["access_token"];
     } else {
      // Otherwise if there were errors or the token was of the wrong type return null
      return null;
     }
}


?>
