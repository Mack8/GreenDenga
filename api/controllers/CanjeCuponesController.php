<?php

class canjeCupon{

    public function index(){
        //Obtener el listado del Modelo
        $cupones_canje =new canjeCuponModel();
        $response=$cupones_canje->all();
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


    public function getByIDCanje($id)
    {
        //Instancia del modelo
        $usuario=new canjeCuponModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getByIDCanje($id);
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

    public function getCanjeByUser($id)
    {
        //Instancia del modelo
        $usuario=new canjeCuponModel();
        //Acción del modelo a ejecutar
        $response = $usuario->getCanjeByUser($id);
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


    public function create() {
        try {
            // Obtener json enviado
            $inputJSON = file_get_contents('php://input');
            // Decodificar json
            $object = json_decode($inputJSON);
            $cuponModel = new canjeCuponModel();  // <-- Asegúrate de instanciar canjeCuponModel
    
            // Acción del modelo a ejecutar
            $response = $cuponModel->create($object);
    
            if (isset($response) && !empty($response)) {
                $json = array(
                    'status' => 400,
                    'results' => "No se creó el recurso",
                );
            } else {
                $json = array(
                    'status' => 200,
                    'results' => 'Canje de Cupón Realizado',
                );
            }
    
            // Escribir respuesta JSON con código de estado HTTP
            echo json_encode(
                $json,
                http_response_code($json["status"])
            );
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    
}

