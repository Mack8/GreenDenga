<?php

require_once "vendor/autoload.php";
use Firebase\JWT\JWT;

class usuario{
    private $secret_key = 'e0d17975bc9bd57eee132eecb6da6f11048e8a88506cc3bffc7249078cf2a77a';

    public function index(){
        //Obtener el listado del Modelo
        $usuario=new UsuarioModel();
        $response=$usuario->all();
        //Si hay respuesta
        if(isset($response) && !empty($response)){
            //Armar el json
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }



    public function getById($id)
    {
        //Instancia del modelo
        $usuario=new UsuarioModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getById($id);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            //Armar el JSON respuesta satisfactoria
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            //JSON respuesta negativa
            $json = array(
                'status' => 400,
                'results' => "No existe el recurso solicitado"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }


    public function getByTipoUsuario($idTipo)
    {
        //Instancia del modelo
        $usuario=new UsuarioModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getByTipoUsuario($idTipo);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            //Armar el JSON respuesta satisfactoria
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            //JSON respuesta negativa
            $json = array(
                'status' => 400,
                'results' => "No existe el recurso solicitado"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }

    public function getOtrosAdministradores($idCentro)
    {
        //Instancia del modelo
        $usuario=new UsuarioModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getOtrosAdministradores($idCentro);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            //Armar el JSON respuesta satisfactoria
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            //JSON respuesta negativa
            $json = array(
                'status' => 400,
                'results' => "No existe el recurso solicitado"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }

    public function getByTipoUsuarioWithCurrent($idTipo, $idCentroAcopio)
    {
        //Instancia del modelo
        $usuario=new UsuarioModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getByTipoUsuarioWithCurrent($idTipo,$idCentroAcopio);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            //Armar el JSON respuesta satisfactoria
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            //JSON respuesta negativa
            $json = array(
                'status' => 400,
                'results' => "No existe el recurso solicitado"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }


    public function getByProvincia($provincia)
    {
        //Instancia del modelo
        $usuario=new UsuarioModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getByProvincia($provincia);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            //Armar el JSON respuesta satisfactoria
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            //JSON respuesta negativa
            $json = array(
                'status' => 400,
                'results' => "No existe el recurso solicitado"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }


    public function getEstado()
    {
        //Instancia del modelo
        $usuario=new UsuarioModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getEstado();
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            //Armar el JSON respuesta satisfactoria
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            //JSON respuesta negativa
            $json = array(
                'status' => 400,
                'results' => "No existe el recurso solicitado"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }

    public function login(){
        
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $usuario=new UsuarioModel();
        $response=$usuario->login($object);
        if(isset($response) && !empty($response) && $response!=false){
            // Datos que desea incluir en el token JWT
            $data = [
                'id' => $response->id,
                'email' => $response->correo_electronico,
                'rol' => $response->tipo_usuario
            ];

            error_log('Información del usuario: ' . json_encode($data));
            // Generar el token JWT 
            $jwt_token = JWT::encode($data, $this->secret_key,'HS256');
            $json=array(
                'status'=>200,
                'results'=>$jwt_token
            );
        }else{
            $json=array(
                'status'=>200,
                'results'=>"Usuario no valido"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
       
    }

    public function create() {
        try {
            $inputJSON = file_get_contents('php://input');
            $object = json_decode($inputJSON);
            
            $usuario = new UsuarioModel();
            $usuario->create($object);
            
            $json = array(
                'success' => true,
                'status' => 200,
                'results' => "Usuario creado"
            );
        } catch (Exception $e) {          
            $json = array(
                'success' => false,
                'status' => 400,
                'results' => "El correo electronico o identificacion ya está registrado",
                'error' => $e->getMessage()  
            );
        }
        
        // Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
    


 

    public function autorize(){
        
        try {
            
            $token = null;
            $headers = apache_request_headers();
            if(isset($headers['Authentication'])){
              $matches = array();
              preg_match('/Bearer\s(\S+)/', $headers['Authentication'], $matches);
              if(isset($matches[1])){
                $token = $matches[1];
                return true;
              }
            } 
            return false;
                   
        } catch (Exception $e) {
            return false;
        }
    }


}




