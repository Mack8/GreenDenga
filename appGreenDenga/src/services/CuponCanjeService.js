import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"canjeCupon"
 //localhost:81/api/materiales/
 class CuponCanjeService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/materiales

  //localhost:81/api/materiales/2
  getCentroAcopioById(ID){
    return axios.get(BASE_URL+"/"+ID)
  }

  createCanjeCupon(canje){
    return axios.post(BASE_URL, canje);
}



 }




 export default new CuponCanjeService()