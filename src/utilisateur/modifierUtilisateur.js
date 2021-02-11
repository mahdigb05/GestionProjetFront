import React, { useState, useEffect } from 'react';
import UtilisateurService from '../services/UtilisateurService';
import { message, Input, Form, Button, Select } from 'antd';

const { Option } = Select;
const ModifierUtilisateur = (props) => {
    console.log(props.location.state);
    const [utilisateur, setUtilisateur] = useState({});
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");


    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(() => {
        setId(props.location.state.id)
        setNom(props.location.state.nom);
        setPrenom(props.location.state.prenom);
        setEmail(props.location.state.email);
        setRole(props.location.state.role);
        setPassword(props.location.state.password);
        console.log(utilisateur);
    }, [])

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleUpdateUtilisateur = () => {
        let u = {
            id: id,
            prenom: prenom,
            email: email,
            nom: nom,
            role: role,
            password : password
        }
        console.log(u);

        UtilisateurService.modifierUtilisateur(u).then(res => {
            if (res.data != null) {
                message.success("SA bien enregistrer!!")
            }
        }).catch(error => {
            message.error(error.response)
        })
    }

    const handleBack = () => {
        props.history.push("/GestionUtilisateur");
    }

    return (
        <div className="mb-3 row">
            <div className="col mt-lg-5 container mx-auto">
                <div className="Tete form-inline " style={{ marginTop: '3%' }} >
                    <h2 className="font-weight-bold" style={{ marginRight: '10%', marginLeft: '3%' }}>Modifier un utilisateur</h2>
                </div>
                <Form {...layout} initialValues={{ remember: true }} name="nest-messages" onFinish={handleUpdateUtilisateur} validateMessages={validateMessages} style={{ width: "600px", marginRight: '30%', marginLeft: '25%' }}>
                    <Form.Item
                        name='nom'
                        label="Nom"
                    >
                        <Input defaultValue={props.location.state.nom} onChange={(value) => setNom(value.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name='Prenom'
                        label="Prenom"
                    >
                        <Input defaultValue={props.location.state.prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label="Email"
                    >
                        <Input defaultValue={props.location.state.email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Type d'utulisateur" name= {['utilisateur','role']}>
                        <Select defaultValue={props.location.state.role} onChange={(e) => setRole(e.target.value)}>
                            <Option value = "ROLE_ETUDIANT">Etudiant</Option>
                            <Option value = "ROLE_AGENT">Agent administratif</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Modifier
                        </Button>
                        <Button type="primary" onClick={handleBack} style={{ marginLeft: '65%' }}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )

}

export default ModifierUtilisateur;