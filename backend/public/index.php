<?php

use App\Application;
use App\Http\Middleware\Auth;
use App\Routing\Route;
use App\Http\Response;
use App\Http\Request;
use App\Models\Appointment;
use App\Models\Users;

header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Headers: Authorization, Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');


require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$app = new Application();

/*
|------------------------------------------------------------------
| API Routes
|------------------------------------------------------------------
|
| Here is where you can register API routes for your application. 
|
*/

Route::post('/api/user/signup', function (Request $request) {
  $user = $request->form();
  // check email
  if (!!count(Users::findBy(['email' => $user->email], ["email"]))) {
    return Response::json(["message" => "Email must be unique, already taken"]);
  }
  $password = password_hash($user->password, PASSWORD_DEFAULT);
  $user->password = $password;
  $user->ref = strtoupper(substr(md5(uniqid()), 0, 8));
  Users::create($user);
  unset($user->password);
  $response = Auth::create($user);
  $response->dd = $user;
  $response->dd->ref = $user->ref;
  Response::json($response);
});


Route::post('/api/user/signin', function (Request $request) {
  $user = $request->form();
  $userFind = Users::findBy(['email' => $user->email]);
  if (!count($userFind)) {
    return Response::json(["message" => "Email Not Found"]);
  }
  if (password_verify($user->password, $userFind[0]['password'])) {
    unset($userFind[0]['password']);
    $response = Auth::create($userFind[0]);
    $response->dd = $userFind[0];
    Response::json($response);
  } else {
    Response::json(["message" => "password incorrect"]);
  }
});


Route::post('/api/auth', function (Request $request) {
  $token = $request->json()->Authorization;
  $authorize = Auth::verify($token);
  Response::json($authorize);
});


Route::post('/api/appointment', function (Request $request) {
  $appointment = $request->form();
  Appointment::create($appointment);
  Response::json(["maessage" => "success"]);
});

Route::get('/api/appointment/{day}', function (Request $request) {
  $day = $request->params->day;
  $appointment = Appointment::findBy(['day' => $day], ['time']);

  $missingSlots = array_values(array_diff(range(1, 4), array_column($appointment, 'time')));

  $foundAppointments = array_map(function ($cur) {
    $cur["slot"] = true;
    $cur["time"] = (int)$cur["time"];
    return $cur;
  }, $appointment);

  $missingAppointments = array_map(function ($cur) {
    return ['time' => $cur, 'slot' => false];
  }, $missingSlots);

  $appointments = array_merge($foundAppointments, $missingAppointments);

  usort($appointments, function ($a, $b) {
    if ($a['time'] == $b['time']) return 0;
    return ($a['time'] > $b['time']) ? 1 : -1;
  });

  Response::json($appointments);
});

Route::get('/api/user/{ref}', function (Request $request) {
  $ref = $request->params->ref;
  $user = Appointment::findBy(['ref' => $ref]);
  Response::json($user);
});


Route::delete('/api/appointment/{id}', function (Request $request) {
  $id = $request->params->id;
  Appointment::delete($id);
  Response::json(["message" => "appointment deleted"]);
});

$app->run();
