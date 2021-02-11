import React, {useContext, useEffect} from 'react';
import { Collapse, Button, message} from 'antd';
import SAService from "../services/SAService";
import {SAContext} from '../contexts/SAContext';
import NavBar from '../navBar/NavBar';

const { Panel } = Collapse;

const GestionSA =  (props) => {
    const sAContext = useContext(SAContext);
    const {SA, setSA} = sAContext;

    useEffect(() => {
        SAService.getAllSA().then((res) => {
            setSA(res.data)
        })
    },[])

    
    const handleClick = () => {
        props.history.push("/AjouterSA");
    };

    const handleChange = (sa) => {
        console.log(sa);
        props.history.push("/ModifierSA",sa);
    }
    
    const handleDelete = (idStructure) => {
        console.log(idStructure);
        SAService.supprimerSA(idStructure).then((res) =>{
            message.success("Supprimer")
            SAService.getAllSA().then((res) => {
                setSA(res.data)
            })
        })   
    }

    return(
        <div className = "GestionSA">
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col mt-lg-5" style={{width: "800px",marginRight:'30%',marginLeft:'20%'}}>
                    <div className = "Tete form-inline " style={{marginTop:'3%'}} >
                        <h2 className = "font-weight-bold" >Structures d'acceuils</h2>
                    </div>
                        <div className="Tete form-inline" style={{ marginTop: "3%" }}>
                            <Button type="primary" onClick = {handleClick} style={{marginLeft:'72%', marginBottom:'10px'}}>Ajouter une structure d'accueil</Button>
                        </div>
                        <Collapse accordion>
                            {
                                SA.map((sa,index) => {
                                    return(
                                        <Panel header = {sa.nomStructure} key = {index}>
                                            <ul>
                                                <li>Le nom de la structure : {sa.nomStructure}</li>
                                                <li>Description : {sa.description}</li>
                                                <li>Adresse : {sa.adresse}</li>
                                                <li>Email : {sa.email}</li>
                                                <li>Telephone : {sa.tel}</li>  
                                            </ul>
                                            <Button type = "primary" onClick = {() => handleChange(sa)} style={{marginLeft:'72%'}}>Modifier</Button>
                                            <Button type = "primary" onClick = {() => handleDelete(sa.idStructure)} style={{marginLeft:'2%'}}>Supprimer</Button>
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

export default GestionSA;