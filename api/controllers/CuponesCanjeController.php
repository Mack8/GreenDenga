<?php

class cupones{

    public function index(){
        //Obtener el listado del Modelo
        $cupones_canje =new cuponesModel();
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


    public function get($param){
        
        $material=new cuponesModel();
        $response=$material->get($param);
        $json=array(
            'status'=>200,
            'results'=>$response
        );
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el cupon"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
       );}

    public function getByCategory($param){
        //Obtener el listado del Modelo
        $cupones_canje =new cuponesModel();
        $response=$cupones_canje->getByCategory($param);
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

    public function getCuponesVigentes(){
        //Obtener el listado del Modelo
        $cupones_canje =new cuponesModel();
        $response=$cupones_canje->getCuponesVigentes();
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

    public function create() {
        // Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        // Imprimir el JSON antes de decodificarlo
        $inputJSON = json_encode($_POST);
        
        // Decodificar json
        $object = json_decode($inputJSON);
    
        // Verificar si se pudo decodificar el JSON correctamente
        if ($object === null && json_last_error() !== JSON_ERROR_NONE) {
            $json = array(
                'status' => 400,
                'results' => 'Error al decodificar el JSON'
            );
    
            echo json_encode($json, http_response_code($json["status"]));
            return;
        }
    
        // Verificar si $object contiene información
        if (empty($object)) {
            $json = array(
                'status' => 400,
                'results' => 'El objeto está vacío'
            );
    
            echo json_encode($json, http_response_code($json["status"]));
            return;
        }
    
        // Instancia del modelo
        $material = new cuponesModel();
    
        // Acción del modelo a ejecutar
        $response = $material->create($object);
    
        // Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => $response 
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => 'No se creó el recurso'
            );
        }
    
        // Escribir respuesta JSON con código de estado HTTP
        echo json_encode($json, http_response_code($json["status"]));
    }
    

public function update()
{
    // Obtener JSON enviado
    $inputJSON = file_get_contents('php://input');
    // Decodificar JSON
    $object = json_decode($inputJSON);
    // Instancia del modelo de centro de acopio
    $material = new cuponesModel();
    // Acción del modelo a ejecutar
    $response = $material->update($object);
    // Verificar respuesta
    if (isset($response) && !empty($response)) {
        $json = array(
            'status' => 200,
            'results' => 'Cupon actualizado',
        );
    } else {
        $json = array(
            'status' => 400,
            'results' => 'No se actualizó el cupon',
        );
    }
    // Escribir respuesta JSON con código de estado HTTP
    echo json_encode(
        $json,
        http_response_code($json['status'])
    );
}

    
}