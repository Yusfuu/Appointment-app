<?php

namespace App\Http;

header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Headers: Authorization, Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');


class Request
{
  public $params;
  public $query;
  public $contentType;
  public $method;
  public $path;

  public function __construct($args)
  {
    $this->method = $args->method;
    $this->params = $args->params;
    $this->query = $args->query;
    $this->url = $args->url;
    $this->path = $args->path;
    $this->contentType = $_SERVER["CONTENT_TYPE"] ?? null;
    $this->authorization = $_SERVER["HTTP_AUTHORIZATION"] ?? null;
  }

  public function json()
  {
    if ($this->method !== "POST" || $this->contentType !== "application/json") {
      return null;
    }

    $value = json_decode(file_get_contents("php://input"));

    return json_last_error() === JSON_ERROR_NONE ? $value : null;
  }

  public function form()
  {
    if ($this->method !== "POST") {
      return null;
    }

    $body = [];
    foreach ($_POST as $key => $value) {
      $body[$key] = trim(filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS));
    }
    return (object)$body;
  }
}
