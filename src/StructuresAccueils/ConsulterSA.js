import React, {useContext, useEffect} from 'react';
import { Collapse } from 'antd';
import SAService from "../services/SAService";
import {SAContext} from '../contexts/SAContext';
import NavBar from '../navBar/NavBar';

const { Panel } = Collapse;

const ConsulterSA =  () => {
    const sAContext = useContext(SAContext);
    const {SA, setSA} = sAContext;

    useEffect(() => {
        SAService.getAllSA().then((res) => {
            console.log(res.data);
            setSA(res.data)
        })
    },[])

    console.log(SA)
    
    return(
        
        <div className = "ConsulterSA">
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col mt-lg-5" style={{width: "800px",marginRight:'30%',marginLeft:'20%'}}>
                    <div className = "Tete form-inline " style={{marginTop:'3%'}} >
                        <h2 className = "font-weight-bold" >Structures d'acceuils</h2>
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

export default ConsulterSA;