<?php

namespace App;

use App\Routing\Route;

header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Headers: Authorization, Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
class Application
{

  public function __construct()
  {
    $this->route = new Route();
  }

  public function run()
  {
    $this->route->call();
  }
}
