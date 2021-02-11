import React from 'react';
import SAService from '../services/SAService';
import {message, Input, Form, InputNumber, Button} from 'antd';
import NavBar from '../navBar/NavBar';


const ajouterSA = (props) => {
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

    const handleAddSA = (values) =>{
        console.log(values.sa);

        SAService.ajouterSA(values.sa).then(res => {
            if(res.data != null){
                message.success("SA bien enregistrer!!")
            }
        }).catch(error => {
            message.error(error.response)
      })
    }

    const handleBack = () => {
        props.history.push("/GestionSA");
    }

    return (
        <div className = "mb-3 row">
            <NavBar/>
            <div className = "col mt-lg-5 container mx-auto">
                <div className = "Tete form-inline " style={{marginTop:'3%'}} >
                    <h2 className = "font-weight-bold" style={{marginRight:'10%',marginLeft:'3%'}}>Ajouter une structure d'acceuil</h2>
                </div>
                <Form {...layout} name="nest-messages" onFinish={handleAddSA} validateMessages={validateMessages} style={{width: "600px",marginRight:'30%',marginLeft:'25%'}}>
                    <Form.Item
                        name={['sa', 'nomStructure']}
                        label="Nom de la structure d'accueil"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['sa', 'email']}
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
                        name={['sa', 'adresse']}
                        label="Adresse"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name={['sa', 'tel']} label="Telephone">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['sa', 'description']} label="Description">
                        <Input.TextArea />
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

export default ajouterSA;