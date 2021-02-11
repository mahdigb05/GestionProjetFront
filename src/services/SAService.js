import axios from 'axios';
const URL = "http://localhost:8080/gestionProjet/structure/";
const token = localStorage.getItem('token')
const header = {
    headers : {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
    }
}

class SAService{
    getAllSA(){
        console.log(axios.get(URL,header));
        return axios.get(URL,header);
    }

    ajouterSA(SA){
        console.log(SA);
        return axios.post(URL,SA,header);
    }

    modifierSA(SA){
        console.log(SA);
        return axios.put(URL,SA,header);
    }
    supprimerSA(idStructure){
        console.log(idStructure);
        return axios.delete(URL+`${idStructure}`,header);
    }

}

export default new SAService()