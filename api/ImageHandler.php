<?php
class ImageHandler{
    private $targetDir;

    public function __construct($targetDir){
        $this->targetDir = $targetDir;
    }

    public function createImage($file){
        $targetFile = $this->targetDir.basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            return true;
        }else {
            return false;
        }
    }

    public function getImage($imageName){
        $imagePath = $this->targetDir.$imageName;
        if (file_exists($imagePath)) {
            header('Content-Type: image/*');
            readfile($imagePath);
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array('status'=>'error', 'message'=>'Image not found.'));
        }
    }
}