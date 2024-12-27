<?php

class canjeMaterial{

    public function index(){
        //Obtener el listado del Modelo
        $canje_Material =new canjeMaterialModel();
        $response=$canje_Material->all();
        
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
        $canje_Material=new canjeMaterialModel();
        //Acción del modelo a ejecutar
        $response = $canje_Material->getById($id);
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

    public function getByIdAdmin($id)
    {
        //Instancia del modelo
        $canje_Material=new canjeMaterialModel();
        //Acción del modelo a ejecutar
        $response = $canje_Material->getByIdAdmin($id);
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


    public function getByIDCanje($idCanje)
    {
        //Instancia del modelo
        $canje_Material=new canjeMaterialModel();
        //Acción del modelo a ejecutar
        $response = $canje_Material->getByIDCanje($idCanje);
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


    public function getByTipoMaterial($id)
    {
        //Instancia del modelo
        $canje_Material=new canjeMaterialModel();
        //Acción del modelo a ejecutar
        $response = $canje_Material->getByTipoMaterial($id);
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


    public function getByUsuario($id)
    {
        //Instancia del modelo
        $canje_Material=new canjeMaterialModel();
        //Acción del modelo a ejecutar
        $response = $canje_Material->getByUsuario($id);
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

    public function getByCentroAcopio($idCentroAcopio)
    {
        //Instancia del modelo
        $canje_Material=new canjeMaterialModel();
        //Acción del modelo a ejecutar
        $response = $canje_Material->getByCentroAcopio($idCentroAcopio);
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



    public function create()
    {
     
        
        // Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        // Decodificar json
        $object = json_decode($inputJSON);
        
            // Instancia del modelo
            $canje = new canjeMaterialModel();
            // Acción del modelo a ejecutar
            $response = $canje->createCanje($object);
            
            if (isset($response) && !empty($response)) {
                $json = array(
                    'status' => 400,
                    'results' => "No se creó el recurso",
                    
                );
            } else {
                $json = array(

                    'status' => 200,
                    'results' => 'Canje Realizado',      

                );
            }
        
        // Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
   );
}

}

 