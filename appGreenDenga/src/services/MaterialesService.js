import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"materiales"
 //localhost:81/api/materiales/
 class MaterialesService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/materiales
  getMateriales(){
    return axios.get(BASE_URL);
  }
  //localhost:81/api/materiales/2
  getMaterialesById(MaterialesID){
    return axios.get(BASE_URL+"/"+MaterialesID)
  }
  //localhost:81/api/materiales/getMaterialesByCentroAcopio/3
  getMaterialesByCentroAcopio(id){
    return axios.get(BASE_URL+"/getMaterialesByCentroAcopio/"+id)
  }

  createMateriales(materiales) {
    const dataToSubmit = new FormData();
    dataToSubmit.append("nombre", materiales.nombre);
    dataToSubmit.append("descripcion", materiales.descripcion);
    dataToSubmit.append("unidad_medida", materiales.unidad_medida);
    dataToSubmit.append("precio", materiales.precio);
    dataToSubmit.append("color", materiales.color);
    dataToSubmit.append("imagen", materiales.imagen);

    // Imprimir el contenido de formData en la consola
    console.log("Contenido de formData:", materiales);
    console.log("Contenido de formData:", dataToSubmit.get("nombre"), dataToSubmit.get("descripcion"));
  
    // Realizar la solicitud POST con FormData
    return axios.post(BASE_URL, dataToSubmit, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
});
}

  getImage(imageName){
    return axios.get("http://localhost:81/api/ImangeHandler/"+ '?image='+imageName,{
      responseType: 'blob',
    })
  }
  getImages(imageName){
    return axios.get("http://localhost:81/api/ImangeHandler/"+ '?image='+imageName,{
      responseType: 'arraybuffer',
    })
  }

  updateMateriales(data){
    return axios.put(BASE_URL, data);
  }
 }
 export default new MaterialesService()