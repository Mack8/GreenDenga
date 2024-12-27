<?php
//Class Materiales
class materiales {
    public function index(){
        //Obtener el listado del Modelo
        $material=new MaterialesModel();
        $response=$material->all();
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
        
        $material=new MaterialesModel();
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
                'results'=>"No existe el material"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );   
    }
    public function getMaterialesByName($name){
        $material=new MaterialesModel();
        $response=$material->getMaterialesByName($name);
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
    public function getMaterialesXPopularidad(){
        $material=new MaterialesModel();
        $response=$material->getMaterialesXPopularidad();
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
    public function getMaterialesXPrecio(){
        $material=new MaterialesModel();
        $response=$material->getMaterialesXPrecio();
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
    public function getMaterialesByCentroAcopio($idCentroAcopio){
        $material=new MaterialesModel();
        $response=$material->getMaterialesByCentroAcopio($idCentroAcopio);
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
    public function getMaterialesByCanje($nombreCanje){
        $material=new MaterialesModel();
        $response=$material->getMaterialesByCanje($nombreCanje);
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
    public function getMaterialesCanjeadosXtiempo($FechaInicio, $FechaFinal){
        $material=new MaterialesModel();
        $response=$material->getMaterialesCanjeadosXtiempo($FechaInicio, $FechaFinal);
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
    public function getMaterialesMasIngresosXtiempo($FechaInicio, $FechaFinal){
        $material=new MaterialesModel();
        $response=$material->getMaterialesMasIngresosXtiempo($FechaInicio, $FechaFinal);
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
    public function getMaterialesByUser($id){
        $material=new MaterialesModel();
        $response=$material->getMaterialesByUser($id);
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
    public function getMaterialesByCentroAcopioXTiempo($idCentroAcopio, $FechaInicio, $FechaFinal){
        $material=new MaterialesModel();
        $response=$material->getMaterialesByCentroAcopioXTiempo($idCentroAcopio, $FechaInicio, $FechaFinal);
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
    public function getMaterialesByCanjeXTiempo($nombreCanje, $FechaInicio, $FechaFinal){
        $material=new MaterialesModel();
        $response=$material->getMaterialesByCanjeXTiempo($nombreCanje, $FechaInicio, $FechaFinal);
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
        $material = new MaterialesModel();
    
        // Acción del modelo a ejecutar
        $response = $material->createMaterial($object);
    
        // Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => $response //'Material creado'
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
    $material = new MaterialesModel();
    // Acción del modelo a ejecutar
    $response = $material->updateMaterial($object);
    // Verificar respuesta
    if (isset($response) && !empty($response)) {
        $json = array(
            'status' => 200,
            'results' => 'Material actualizado',
        );
    } else {
        $json = array(
            'status' => 400,
            'results' => 'No se actualizó el material',
        );
    }
    // Escribir respuesta JSON con código de estado HTTP
    echo json_encode(
        $json,
        http_response_code($json['status'])
    );
}
}