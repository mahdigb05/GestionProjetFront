import React from 'react';
import UtilisateurService from '../services/UtilisateurService';
import {message, Input, Form, Button, Select} from 'antd';

const { Option } = Select;

const ajouterUtilisateur = (props) => {
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleAddUtilisateur = (values) =>{
        console.log(values.utilisateur);

        UtilisateurService.ajouterUtilisateur(values.utilisateur).then(res => {
            if(res.data != null){
                message.success("Utilisateur bien enregistrer!!")
            }
        }).catch(error => {
            message.error(error.response)
      })
    }

    const handleBack = () => {
        props.history.push("/GestionUtilisateur");
    }

    return (
        <div className = "mb-3 row">
            <div className = "col mt-lg-5 container mx-auto">
                <div className = "Tete form-inline " style={{marginTop:'3%'}} >
                    <h2 className = "font-weight-bold" style={{marginRight:'10%',marginLeft:'3%'}}>Ajouter un utilisateur</h2>
                </div>
                <Form {...layout} name="nest-messages" onFinish={handleAddUtilisateur} validateMessages={validateMessages} style={{width: "600px",marginRight:'30%',marginLeft:'25%'}}>
                    <Form.Item
                        name={['utilisateur', 'nom']}
                        label="Nom"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['utilisateur', 'prenom']}
                        label="Prenom"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['utilisateur', 'email']}
                        label="Email"
                        rules={[
                        {
                            required: true,
                            type: 'email',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['utilisateur', 'password']}
                        label="Mot de passe"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Type d'utulisateur" name= {['utilisateur','role']}
                        rules={[
                            {
                                required: true,
                            },
                            ]}
                    >
                        <Select>
                            <Option value = "ROLE_ETUDIANT">Etudiant</Option>
                            <Option value = "ROLE_AGENT">Agent administratif</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Ajouter
                        </Button>
                        <Button type="primary" onClick = {handleBack} style={{marginLeft:'65%'}}>
                                Back
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
    
}

export default ajouterUtilisateur;