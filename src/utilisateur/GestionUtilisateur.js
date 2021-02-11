import React, {useContext, useEffect} from 'react';
import { Collapse, Button, message} from 'antd';
import UtilisateurService from "../services/UtilisateurService";
import {UtilisateurContext} from '../contexts/UtilisateurContext';

const { Panel } = Collapse;

const GestionUtilisateur =  (props) => {
    const utilisateurContext = useContext(UtilisateurContext);
    const {utilisateurs, setUtilisateurs} = utilisateurContext;

    useEffect(() => {
        UtilisateurService.getAllUtilisateurs().then((res) => {
            setUtilisateurs(res.data)
        })
    },[])

    
    const handleClick = () => {
        props.history.push("/AjouterUtilisateur");
    };

    const handleChange = (Utilisateur) => {
        console.log(Utilisateur);
        props.history.push("/ModifierUtilisateur",Utilisateur);
    }
    
    const handleDelete = (id) => {
        console.log(id);
        UtilisateurService.supprimerUtilisateur(id).then((res) =>{
            message.success("Supprimer")
            UtilisateurService.getAllUtilisateurs().then((res) => {
                setUtilisateurs(res.data)
            })
        })   
    }

    return(
        <div className = "GestionUtilisateur">
            <div className="container">
                <div className="row">
                    <div className="col mt-lg-5" style={{width: "800px",marginRight:'30%',marginLeft:'20%'}}>
                    <div className = "Tete form-inline " style={{marginTop:'3%'}} >
                        <h2 className = "font-weight-bold" >Utilisateurs</h2>
                    </div>
                        <div className="Tete form-inline" style={{ marginTop: "3%" }}>
                            <Button type="primary" onClick = {handleClick} style={{marginLeft:'72%', marginBottom:'10px'}}>Ajouter un utilisateur</Button>
                        </div>
                        <Collapse accordion>
                            {
                                utilisateurs.map((utilisateur,index) => {
                                    return(
                                        <Panel header = {utilisateur.id} key = {index}>
                                            <ul>
                                                <li>Nom : {utilisateur.nom}</li>
                                                <li>Prenom : {utilisateur.prenom}</li>
                                                <li>Email : {utilisateur.email}</li>
                                                <li>Role : {utilisateur.role}</li>
                                            </ul>
                                            <Button type = "primary" onClick = {() => handleChange(utilisateur)} style={{marginLeft:'72%'}}>Modifier</Button>
                                            <Button type = "primary" onClick = {() => handleDelete(utilisateur.id)} style={{marginLeft:'2%'}}>Supprimer</Button>
                                        </Panel>
                                    )
                                })
                            }
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GestionUtilisateur;