import axios from 'axios';
const URL = "http://localhost:8080/";
const token = localStorage.getItem('token')
const header = {
    headers : {
        'Access-Control-Allow-Origin': 'http://localhost:3000/gestionProjet/rapport',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
    }
}

class RapportsService{
    getAllRapportsArchive(){
        return axios.get(URL,header);
    }

}

export default new RapportsService()