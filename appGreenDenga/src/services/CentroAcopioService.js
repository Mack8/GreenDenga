import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"centroAcopio"
 //localhost:81/api/materiales/
 class CentroAcopioService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/materiales
  getCentroAcopio(){
    return axios.get(BASE_URL);
  }
  //localhost:81/api/materiales/2
  getCentroAcopioById(ID){
    return axios.get(BASE_URL+"/"+ID)
  }

  createCentroAcopio(centroAcopio){
    return axios.post(BASE_URL, centroAcopio);
}

updateCentroAcopio(centroAcopio){
  return axios.put(BASE_URL, centroAcopio);
}

getMaterialesByCentro(ID){
  return axios.get(BASE_URL+"/"+"getMaterialesByCentro"+ID)
}

getByAdministrador(ID){
  return axios.get(BASE_URL+"/"+"getByAdministrador"+"/"+ID)
}

 }


 export default new CentroAcopioService()