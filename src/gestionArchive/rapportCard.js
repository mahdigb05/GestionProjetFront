import { Card, Modal, Form, Input } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useState } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Meta } = Card;
const RapportCard = ({ rapport }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [titre, setTitre] = useState("");
  const [filiere, setFiliere] = useState("");
  const [state, setState] = useState("");

  const role = localStorage.getItem("user_role");
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8080/rapport/" + rapport.idRapport, {
        headers: headers,
      });
      setVisible2(false);
    } catch (err) {}
  };

  // const handleArchive = async () => {
  //   try {
  //     await axios.put(
  //       "http://localhost/rapport/",
  //       { ...rapport, archive: true },
  //       { headers: headers }
  //     );
  //     setVisible3(false);
  //   } catch (err) {}
  // };

  const handleClick = async () => {
    if (localStorage.getItem("user_role") === "ROLE_ETUDIANT") {
      setVisible2(false);
      return;
    }
    if (state === "modification") {
      try {
        await axios.put(
          "http://localhost/rapport/",
          { ...rapport, titre, filiere },
          { headers: headers }
        );
        setVisible2(false);
        setState("");
      } catch (err) {}
    } else if (state === "consultation") {
      setState("modification");
      setTitre(rapport.titre);
      setFiliere(rapport.filiere);
    }
  };

  const actions =
    localStorage.getItem("user_role") === "ROLE_ETUDIANT"
      ? [<EyeOutlined key="setting" onClick={handleClick} />]
      : [
          <EyeOutlined key="setting" onClick={handleClick} />,
          <DeleteOutlined onclick={handleDelete} />,
        ];

  return (
    <>
      <Modal
        title="confirmation de suppression"
        visible={visible1}
        onOk={handleDelete}
        onCancel={() => {
          setVisible1(false);
        }}
      >
        voulez-vous vraiment supprimer ce rapport ?
      </Modal>

      <Modal
        title={state === "consultation" ? "consultation" : "modification"}
        visible={visible2}
        onOk={handleClick}
        okText={state === "consultation" ? "modifier" : "valider"}
        cancelText="annuler"
        onCancel={() => {
          setVisible2(false);
        }}
      >
        <Form {...layout} name="basic">
          <Form.Item label="Sujet" name="name1">
            <Input
              readOnly={state === "modification" ? false : true}
              defaultValue={rapport.titre}
              onChange={(value) => setTitre(value.target.value)}
            />
          </Form.Item>
          <Form.Item label="Date de depo" name="name2">
            <Input readOnly defaultValue={rapport.dateDepot} />
          </Form.Item>
          <Form.Item label="Date d'archivage'" name="name3">
            <Input readOnly defaultValue={rapport.dateArchivage} />
          </Form.Item>
          <Form.Item label="Filiere" name="name4">
            <Input
              readOnly={state === "modification" ? false : true}
              defaultValue={rapport.filiere}
              onChange={(value) => setFiliere(value.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <div>
        <div className="container pt-4">
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={actions}
          >
            <Meta title={rapport.titre} description={rapport.description} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default RapportCard;
