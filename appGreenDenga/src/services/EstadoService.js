import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL+"estado"

class EstadoService {

    getEstados(){
        return axios.get(BASE_URL);
    }

}

export default new EstadoService()