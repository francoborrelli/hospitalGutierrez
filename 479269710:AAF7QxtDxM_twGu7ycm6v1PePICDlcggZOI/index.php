<?php

require_once './Bot.php';

use Bot\Bot;

$bot = new Bot();
$bot->run();

// $rawData = file_get_contents('php://input');
// $response = json_decode($rawData, true);
// $id_del_chat = $response['message']['chat']['id'];
// 
// $regExp = '#^(\/[a-zA-Z0-9\/]+?)(\ .*?)$#i';
// 
// $tmp = preg_match($regExp, $response['message']['text'], $aResults);
// 
// if (isset($aResults[1])) {
//     $cmd = trim($aResults[1]);
//     $cmd_params = trim($aResults[2]);
// } else {
//     $cmd = trim($response['message']['text']);
//     $cmd_params = '';
// }
// 
// $params = explode(' ', $cmd_params);
// 
// $msg = array();
// $msg['chat_id'] = $response['message']['chat']['id'];
// $msg['text'] = null;
// $msg['disable_web_page_preview'] = true;
// $msg['reply_markup'] = null;
// 
// switch ($cmd) {
// case '/start':
//     $msg['text']  = 'Hola ' . $response['message']['from']['first_name'] . PHP_EOL;
//     $msg['text'] .= '¿Como puedo ayudarte? /help';
//     break;
// 
// case '/help':
//     $msg['text']  = 'Los comandos disponibles son estos:' . PHP_EOL;
//     $msg['text'] .= '/start Inicializa el bot' . PHP_EOL;
//     $msg['text'] .= '/turnos dd-mm-aaaa Muestra los turnos disponibles del día' . PHP_EOL;
//     $msg['text'] .= '/reservar dd-mm-aaaa hh:mm Realiza la reserva del turno' . PHP_EOL;
//     $msg['text'] .= '/help Muestra esta ayuda flaca';
//     break;
// 
// case '/reservar':
//     $msg['text']  = 'Te confirmamos el turno para:' . PHP_EOL;
// 
//     if (count($params) == 3) {
//         $ch = curl_init();
//         $url = 'https://grupo2.proyecto2017.linti.unlp.edu.ar/api/index.php/turnos/' . $params[0] . '/fecha/' . $params[1] . '/hora/' . $params[2];
//         curl_setopt($ch, CURLOPT_URL, $url);
//         curl_setopt($ch, CURLOPT_POST, 1);
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//         $result = json_decode(curl_exec($ch), true);
//         curl_close ($ch);
//         $msg['text'] = $result['description'];
//     } else {
//         $msg['text'] = 'Debe ingresar los datos con el formato dni dd-mm-aaaa hh-mm';
//     }
//     break;
// 
// case '/turnos':
// 
//     if ((!($params[0] === "") && (count($params) == 1))) {
//         $ch = curl_init();
//         curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//         curl_setopt($ch, CURLOPT_URL, 'https://grupo2.proyecto2017.linti.unlp.edu.ar/api/index.php/turnos/' . $params[0]);
//         $result = json_decode(curl_exec($ch), true);
//         curl_close($ch);
// 
//         if (isset($result['error'])) {
//                 $msg['text'] = $result['description'];
//         } elseif(!empty($result)) {
//             $msg['text']  = 'Los turnos disponibles son:' . PHP_EOL . PHP_EOL;
// 
//             foreach ($result as $turn) {
//                 $date = new DateTime($turn['date']);
//                 $msg['text'] .= '- ' . $date->format('H:i') . PHP_EOL;
//             }
//         } else{
//             $msg['text']  = 'No hay turnos disponibles para esta fecha' . PHP_EOL;
//         }
//     } else {
//         $msg['text']  = 'Debe ingresar una fecha con el formato dd-mm-aaaa';
//     }
//     
//     break;
// 
// default:
//         $msg['text']  = 'Lo siento, no es un comando válido.' . PHP_EOL;
//         $msg['text'] .= 'Prueba /help para ver la lista de comandos disponibles';
//         break;
// }
// 
// $url = 'https://api.telegram.org/bot479269710:AAF7QxtDxM_twGu7ycm6v1PePICDlcggZOI/sendMessage';
// 
// $options = array(
// 'http' => array(
//     'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
//     'method'  => 'POST',
//     'content' => http_build_query($msg)
//     )
// );
// 
// $context  = stream_context_create($options);
// $result = file_get_contents($url, false, $context);
// 
// exit(0);
