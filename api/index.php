<?php
/* Mostrar errores */
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', "C:/xampp/htdocs/peliculas/php_error_log");
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

/*--- Requerimientos Clases o librerías*/
require_once "models/MySqlConnect.php";


/***--- Agregar todos los modelos*/
require_once "models/UsuarioModel.php";
require_once "models/CuponesCanjeModel.php";
require_once "models/CanjeCuponesModel.php";
require_once "models/CanjeMaterialModel.php";
require_once "models/WalletModel.php";
require_once "models/MaterialesModel.php";
require_once "models/CentroAcopioModel.php";
require_once "models/CanjeMaterialesDetalleModel.php";
require_once "models/EstadoModel.php";
require_once "models/RolModel.php";

/***--- Agregar todos los controladores*/
require_once "controllers/UsuarioController.php";
require_once "controllers/CuponesCanjeController.php";
require_once "controllers/CanjeCuponesController.php";
require_once "controllers/CanjeMaterialController.php";
require_once "controllers/WalletController.php";
require_once "controllers/MaterialesController.php";
require_once "controllers/CentroAcopioController.php";
require_once "controllers/CanjeMaterialesDetalleController.php";
require_once "controllers/EstadoController.php";

//Imagen
require "ImageHandler.php";

$targetDir = 'imagenes/';
$imageHandler = new ImageHandler($targetDir);


// Example usage:   

// Creating an image
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['imagen'])) {
    $result = $imageHandler->createImage($_FILES['imagen']);
    if ($result) {
        echo 'File uploaded successfully.';
    } else {
        echo 'Error uploading file.';
    }
}

// Updating an image (PUT request, you may need to adjust this based on your specific requirements)

// Retrieving an image (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['imagen'])) {
    $imageName = $_GET['imagen'];
    $imageHandler->getImage($imageName);
}

//Enrutador
//RoutesController.php
require_once "controllers/RoutesController.php";
$index = new RoutesController();
$index->index();
