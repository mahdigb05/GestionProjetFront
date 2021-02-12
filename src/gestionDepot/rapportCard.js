import { Card, Modal, Form, Input } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  FolderOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

import image from "../pdf.png";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const { Meta } = Card;
const RapportCard = ({ rapport }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [titre, setTitre] = useState("");
  const [filiere, setFiliere] = useState("");
  const [state, setState] = useState("");

  
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8080/rapport/" + rapport.idRapport, {
        headers: headers,
      });
      setVisible1(false);
    } catch (err) {}
  };

  const handleArchive = async () => {
    try {
      await axios.post("http://localhost:8080/rapport/" + rapport.idRapport + "?archiver=true", {
        headers: headers,
      });
      setVisible3(false);
    } catch (err) {}
  };

  const handleClick = async () => {
    if (state === "modification") {
      try {
        await axios.put(
          "http://localhost:8080/rapport/",
          { ...rapport, filiere, sujet :titre },
          { headers: headers }
        );
        setVisible2(false);
        setState("");
      } catch (err) {}
    } else if (state === "consultation") {
      setState("modification");
      setTitre(rapport.sujet);
      setFiliere(rapport.filiere);
    }
  };

  const actions =
    localStorage.getItem("user_role") === "ROLE_ETUDIANT"
      ? [
          <EyeOutlined
            key="eye"
            onClick={() => {
              setVisible2(true);
              setState("consultation");
            }}
          />,
          <DeleteOutlined key="del" onClick={() => setVisible1(true)} />,
        ]
      : [
          <EyeOutlined
            key="eye"
            onClick={() => {
              setVisible2(true);
              setState("consultation");
            }}
          />,
          <DeleteOutlined
            key="del"
            onClick={() => {
              setVisible1(true);
              setState("suppression");
            }}
          />,
          <FolderOutlined key="ar" onClick={() => setVisible3(true)} />,
          <PlusOutlined key="affect" />,
        ];

  return (
    <>
      <Modal
        title="confirmation de suppression"
        visible={visible1}
        onOk={handleDelete}
        onCancel={() => {
          setVisible1(false);
          setState("");
        }}
      >
        voulez-vous vraiment supprimer ce rapport ?
      </Modal>

      <Modal
        title="confirmation d'archivage"
        visible={visible3}
        onOk={handleArchive}
        onCancel={() => {
          setVisible3(false);
          setState("");
        }}
      >
        voulez-vous vraiment archiver ce rapport ?
      </Modal>

      <Modal
        title={state === "consultation" ? "consultation" : "modification"}
        visible={visible2}
        onOk={handleClick}
        okText={state === "consultation" ? "modifier" : "valider"}
        cancelText="annuler"
        onCancel={() => {
          setVisible2(false);
          setState("");
        }}
      >
        <Form {...layout} name="basic">
          <Form.Item label="Sujet" name="name1">
            <Input
              readOnly={state === "modification" ? false : true}
              defaultValue={rapport.sujet}
              onChange={(value) => setTitre(value.target.value)}
            />
          </Form.Item>
          <Form.Item label="Date de depo" name="name2">
            <Input readOnly defaultValue={rapport.dateDepot} />
          </Form.Item>
          <Form.Item label="Filiere" name="name3">
            <Input
              readOnly={state === "modification" ? false : true}
              defaultValue={rapport.filiere}
              onChange={(value) => setFiliere(value.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <div>
        
          <Card
            style={{ width: 250 }}
            cover={<img alt="example" src={image} />}
            actions={actions}
            size="small"
            bordered={false}
          >
            <Meta
              title={rapport.sujet}
              description={
                rapport.filiere +
                " - " +
                rapport.utilisateur.nom +
                " " +
                rapport.utilisateur.prenom
              }
            />
          </Card>
        </div>
      
    </>
  );
};

export default RapportCard;
