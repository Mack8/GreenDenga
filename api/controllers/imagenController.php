<?php
class Imagen{

    public function get($param){
        $genero=new imagenModel();
        $response=$genero->get($param); 
        $json=array( 'status'=>200, 'results'=>$response ); 
        if(isset($response) && !empty($response)){ 
            $json=array( 
                'status'=>200, 
                'results'=>$response 
            ); 
        }else{ $json=array( 
            'status'=>400, 
            'results'=>"No existe el material de reciclaje" 
        ); 
        } 
        echo json_encode($json, http_response_code($json["status"]) 
        );
    }

    public function create() { 
        //Obtener json enviado 
        $inputJSON = file_get_contents('php://input'); 
        //Decodificar json 
        $object = json_decode($inputJSON); 
        //Instancia del modelo 
        $material = new imagenModel(); 
        //Acción del modelo a ejecutar 
        $response = $material->create($object);
        //Verificar respuesta 
        if (isset($response) && !empty($response)) { 
            $json = array( 
                'status' => 200, 
                'results' => $response //'Material creado'
            ); } else { $json = array( 
                'status' => 400, 
                'results' => "No se creo el recurso" 
            ); } //Escribir respuesta JSON con código de estado HTTP 
            echo json_encode( $json, http_response_code($json["status"]) );
    }
}