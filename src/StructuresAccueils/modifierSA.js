import React, {useState, useEffect} from 'react';
import SAService from '../services/SAService';
import {message, Input, Form, Button} from 'antd';
import NavBar from '../navBar/NavBar';


const ModifierSA = (props) => {
	console.log(props.location.state);
	const [SA, setSA] = useState({});
	const [nomStructure, setNomStructure] = useState("");
  	const [adresse, setAdresse] = useState("");
	const [email, setEmail] = useState("");
	const [tel, setTel] = useState("");
	const [description, setDescription] = useState("");
	const [idStructure, setIdStructure] = useState("");


    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
    };

	useEffect(() => {
        setIdStructure(props.location.state.idStructure)
		setNomStructure(props.location.state.nomStructure);
		setAdresse(props.location.state.adresse);
		setEmail(props.location.state.email);
		setTel(props.location.state.tel);
		setDescription(props.location.state.description);
		console.log(SA);
    },[])

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleUpdateSA = () =>{
		let sa = {
			idStructure: idStructure,
			adresse : adresse,
			description : description,
			email : email,
			nomStructure : nomStructure,
			tel : tel
		}
        console.log(sa);
		
        SAService.modifierSA(sa).then(res => {
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
            <NavBar />
            <div className = "col mt-lg-5 container mx-auto">
                <div className = "Tete form-inline " style={{marginTop:'3%'}} >
                    <h2 className = "font-weight-bold" style={{marginRight:'10%',marginLeft:'3%'}}>Ajouter une structure d'acceuil</h2>
                </div>
                <Form {...layout} initialValues = {{ remember: true }} name="nest-messages" onFinish={handleUpdateSA} validateMessages={validateMessages} style={{width: "600px",marginRight:'30%',marginLeft:'25%'}}>
                    <Form.Item
                        name='nomStructure'
                        label="Nom de la structure d'accueil"
                    >
                        <Input defaultValue = {props.location.state.nomStructure} onChange = {(value) => setNomStructure(value.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label="Email"
                    >
                        <Input defaultValue = {props.location.state.email} onChange = {(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name='adresse'
                        label="Adresse"
                    >
                        <Input.TextArea defaultValue = {props.location.state.adresse} onChange = {(e) => setAdresse(e.target.value)} />
                    </Form.Item>
                    <Form.Item name='tel' label="Telephone">
                        <Input defaultValue = {props.location.state.tel} onChange = {(e) => setTel(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name='description' label="Description">
                        <Input.TextArea defaultValue = {props.location.state.description} onChange = {(e) => setDescription(e.target.value)}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Modifier
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

export default ModifierSA;