import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"usuario"
 //localhost:81/api/materiales/
 class UsuariosService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/materiales
  get(){
    return axios.get(BASE_URL);
  }
  //localhost:81/api/materiales/2
  getById(id){
    return axios.get(BASE_URL+"/"+ "getById" +"/"+id)
  }

  obtenerOtrosAdministradores(id,){
    return axios.get(BASE_URL+"/"+ "getOtrosAdministradores" +"/"+id,)
  }


  getByTipoUsuario(id){
    return axios.get(BASE_URL+"/"+ "getByTipoUsuario" +"/"+id)
  }

  createUser(Usuario){
    return axios.post(BASE_URL, Usuario);
}

loginUser(Usuario){
  return axios.post(BASE_URL+ '/login/', Usuario);
}



 }
 export default new UsuariosService()