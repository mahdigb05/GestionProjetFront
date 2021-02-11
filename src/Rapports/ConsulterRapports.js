import React, {useContext, useEffect} from 'react';
import {Table, Space, Button} from 'antd';
//import NavBar from '../navBar/NavBar'
import  {RapportsContext}  from "../contexts/RapportsContext"
import RapportsService from "../services/RapportsService"


const ConsulterRapports =  () => {

    const rapportsContext = useContext(RapportsContext)
    const {rapports, setRapports} = rapportsContext


    useEffect(() => {
        RapportsService.getAllRapportsArchive().then((res) => {
            setRapports(res.data)
        })
    },[])

    function handleClick1(data){
        console.log(data.idRapport);
    }

    function handleClick2(data){
        console.log(data.idRapport);
    }

    const columns = [
        {
            title: 'Sujet',
            dataIndex: 'sujet',
            key: 'sujet',
            width: '40%'
        },
        {
            title: 'Date',
            dataIndex: 'dateDepot',
            key: 'dateDepot',
            width: '20%'
        },
        {
            title : 'Action',
            key : 'action',
            width: '40%',
            render : (_, record) => (
            <Space size="middle">
                <Button type="primary" onClick = {() => handleClick1(record)}>Visualiser</Button>
                <Button type="primary" onClick = {() => handleClick2(record)}>Telecharger</Button>
            </Space>
            )
        }
    ]
    
    return(
        <div className = "ConsulterRapports">
            <Table columns = {columns} dataSource = {rapports} rowKey={record => record.idDepot}></Table>
        </div>
    )
}

export default ConsulterRapports;