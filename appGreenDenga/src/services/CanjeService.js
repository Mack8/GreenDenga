import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL+"canjeMaterial"

class CanjeService {

    getCanjes(){
        return axios.get(BASE_URL);
    }

    getDetalle(idCanje) {
        return axios.get(`${BASE_URL}/getByIDCanje/${idCanje}`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
    
    getById(id) {
        return axios.get(`${BASE_URL}/getById/${id}`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    getByIdAdmin(id) {
        return axios.get(`${BASE_URL}/getByIdAdmin/${id}`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    } 

    getByUsuario(id){
        return axios.get(BASE_URL + '/' + id);
    }

    getByCentroAcopio(idCentroAcopio){
        return axios.get(BASE_URL + '/' + idCentroAcopio);
    }

    createCanje(Canje){
        return axios.post(BASE_URL, Canje);
    }

}



export default new CanjeService()

