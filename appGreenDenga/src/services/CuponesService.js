import axios from'axios';
 const BASE_URL=import.meta.env.VITE_BASE_URL+"cupones"
 //localhost:81/api/cupones/
 class CuponesService{
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/Cupones
  getCupones(){
    return axios.get(BASE_URL);
  }
  //localhost:81/api/cupones/2
  getCuponesById(CuponesID){
    return axios.get(BASE_URL+"/"+CuponesID)
  }

  createCupones(cupones) {
    const dataToSubmit = new FormData();
    dataToSubmit.append("nombre", cupones.nombre);
    dataToSubmit.append("descripcion", cupones.descripcion);
    dataToSubmit.append("categoria", cupones.categoria);
    dataToSubmit.append("fecha_inicio", cupones.fecha_inicio);
    dataToSubmit.append("fecha_fin", cupones.fecha_fin);
    dataToSubmit.append("cantidad_eco_monedas", cupones.cantidad_eco_monedas);
    dataToSubmit.append("imagen", cupones.imagen);

    // Imprimir el contenido de formData en la consola
    console.log("Contenido de formData:", cupones);
    console.log("Contenido de formData:", dataToSubmit.get("nombre"), dataToSubmit.get("descripcion"));
  
    // Realizar la solicitud POST con FormData
    return axios.post(BASE_URL, dataToSubmit, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    
    });
  }

  getImage(imageName){
    return axios.get("http://localhost:81/api/ImageHandler/"+ '?image='+imageName,{
      responseType: 'blob',
    })
  }
  getImages(imageName){
    return axios.get("http://localhost:81/api/ImageHandler/"+ '?image='+imageName,{
      responseType: 'arraybuffer',
    })
  }

  updateCupones(cupones){   

    return axios.put(BASE_URL, cupones)
}
 }
 export default new CuponesService()