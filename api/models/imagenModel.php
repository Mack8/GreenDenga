<?php 
class ImagenModel 
{ 
    public $enlace; 
    public function __construct() 
    {
         $this->enlace = new MySqlConnect(); 
    } 
    // Obtener un material de reciclaje 
    public function get($fileName) 
    { 
        try {
            $directorio = "imagenes"; // Reemplaza "tu_directorio/aqui" con la ruta de tu directorio de imágenes 
            $archivos = scandir($directorio);
            foreach ($archivos as $archivo) {
                $extension = pathinfo($archivo, PATHINFO_EXTENSION);
                $extensiones_permitidas = array("jpg", "jpeg", "png", "gif"); 
                if ($archivo==$fileName){
                    if (in_array($extension, $extensiones_permitidas)) 
                    {
                        $filename = 'imagenes/'.$fileName; 
                        $contents = file_get_contents($filename); 
                        $encoded_contents = base64_encode($contents); 
                        $cadena = str_replace("{", "", $encoded_contents); 
                        return $cadena; 
                    } 
                } 
            } 
        } catch (Exception $e) {
            die($e->getMessage()); 
        } 
    } 
    public function create($objeto) 
    { 
        //Creacion de imagen 
        $nombreImagen = ''; 
        if(isset($_FILES['file'])) 
        { 
            //Generacion de UUID (Identificador Random) 
            $numero = rand(1, 100); 
            $letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $random = substr($letras, rand(0, strlen($letras) - 1), 1); 
            $uuid = $numero ."-".$random; 
            //Guardado de la imagen en la carpeta del API 
            $targetDir = "imagenes/"; 
            $nombreImagen = $uuid .basename($_FILES["file"]["name"]); 
            $targetFile = $targetDir . $uuid .basename($_FILES["file"]["name"]); 
            move_uploaded_file( $_FILES["file"]["tmp_name"], $targetFile); 
        } else{ 
            $nombreImagen ="default.jpg"; 
        } //Retorna el nombre de la imagen que se subio 
        return $nombreImagen; 
    } 
}