import axios from'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+"imagen"

 class ImagesService{
  //Definición para Llamar al API y obtener una imagen
  //localhost:81/api/imagen/2
  getImageByFilename(filename){
    return axios.get(BASE_URL+"/"+filename)
  }
 }

 export default new ImagesService()