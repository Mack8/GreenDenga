<?php
//Class CentroAcopio
class centroAcopio {
    public function index(){
        //Obtener el listado del Modelo
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->all();
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
        
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->get($param);
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
                'results'=>"No existe el Centro de Acopio"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );   
    }

    public function getByAdministrador($param){
        
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getByAdministrador($param);
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
                'results'=>"No existe el Centro de Acopio"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );   
    }

    public function getCentrosByProvincia($provincia){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentrosByProvincia($provincia);
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
    public function getCentrosByCanton($canton){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentrosByCanton($canton);
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

    public function getCentrosByEstado($estado){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentrosByEstado($estado);
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

    public function getCentrosByMaterial($idMaterial){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentrosByMaterial($idMaterial);
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

    public function getCentrosByUbicacionEspecifica($provincia, $canton){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentrosByUbicacionEspecifica($provincia, $canton);
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

    public function getCentrosXCantMaterialesXTiempo($FechaInicio, $FechaFinal){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentrosXCantMaterialesXTiempo($FechaInicio, $FechaFinal);
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

    public function getCentrosMasIngresosXTiempo($FechaInicio, $FechaFinal){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentrosMasIngresosXTiempo($FechaInicio, $FechaFinal);
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
    public function getMaterialesByCentro($id){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getMaterialesByCentro($id);
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

    public function getCentroByAreaByMaterial($idMaterial, $provincia, $canton){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentroByAreaByMaterial($idMaterial, $provincia, $canton);
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

    public function getCentroMasCantidadXTiempo($idMaterial, $FechaInicio, $FechaFinal){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentroMasCantidadXTiempo($idMaterial, $FechaInicio, $FechaFinal);
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
    public function getCentroMasIngresosXTiempo($idMaterial, $FechaInicio, $FechaFinal){
        $centro_Acopio=new centroAcopioModel();
        $response=$centro_Acopio->getCentroMasIngresosXTiempo($idMaterial, $FechaInicio, $FechaFinal);
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


    public function create()
{
    // Obtener json enviado
    $inputJSON = file_get_contents('php://input');
    // Decodificar json
    $object = json_decode($inputJSON);
    
    if ($object) {
        // Instancia del modelo
        $centro = new centroAcopioModel();
        // Acción del modelo a ejecutar
        $response = $centro->createCentroAcopio($object);
        
        if ($response) {
            $json = array(
                'status' => 200,
                'results' => 'Centro acopio creado',
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No se creó el recurso",
            );
        }
    } 
    // Escribir respuesta JSON con código de estado HTTP
    echo json_encode(
        $json,
        http_response_code($json["status"])
    );
}


public function update()
    {
        //Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        //Decodificar json
        $object = json_decode($inputJSON);
        //Instancia del modelo
        $centro = new centroAcopioModel();
        //Acción del modelo a ejecutar
        $response = $centro->update($object);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Centro actualizada"
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No se actualizo el recurso"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }


}