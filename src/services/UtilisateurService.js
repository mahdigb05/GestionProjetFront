import axios from 'axios';
const URL = "http://localhost:8080/gestionProjet/utilisateur/";
const token = localStorage.getItem('token')
const header = {
    headers : {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
    }
}

class UtilisateurService{
    getAllUtilisateurs(){
        console.log(axios.get(URL,header));
        return axios.get(URL,header);
    }

    ajouterUtilisateur(utilisateur){
        console.log(utilisateur);
        return axios.post(URL,utilisateur,header);
    }

    modifierUtilisateur(utilisateur){
        console.log(utilisateur);
        return axios.put(URL,utilisateur,header);
    }
    supprimerUtilisateur(id){
        console.log(id);
        return axios.delete(URL+`${id}`,header);
    }

}

export default new UtilisateurService()