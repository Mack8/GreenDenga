//Imagen
require "ImageHandler.php";

$targetDir = 'uploads/';
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