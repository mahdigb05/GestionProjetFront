import { message, Form, Modal, Input, Select, Upload, Button } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import RapportCard from "./rapportCard";
import { InboxOutlined } from "@ant-design/icons";
import Navbar from "../navBar/NavBar";

const { Option } = Select;
const { Dragger } = Upload;
const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const DepotList = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    rapports,
    structures,
    setStructures,
    setRapport,
    getRessourceFromApi,
  } = useContext(GlobalContext);

  const searchColumns = ["sujet", "filiere"];
  const [visible, setVisible] = useState(false);
  const [idStructure, setIdStructure] = useState(0);
  const [filiere, setfiliere] = useState("");
  const [file, setFile] = useState({});
  const [sujet, setSujet] = useState("");

  useEffect(() => {
    getRessourceFromApi("http://localhost:8080/rapport", setRapport);
    getRessourceFromApi(
      "http://localhost:8080/gestionProjet/structure",
      setStructures
    );
  }, []);

  const ajouterRapport = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    try {
      var payload = new FormData();
      payload.append("idStructure", idStructure);
      payload.append("filiere", filiere);
      payload.append("file", file);
      payload.append("sujet", sujet);
      payload.append("email", "user_email");
      await axios.post("http://localhost:8080/rapport", payload, {
        headers: headers,
      });
      getRessourceFromApi("http://localhost:8080/rapport", setRapport);
      setVisible(false);
      message.success("rapport ajouter avec succes");
    } catch (err) {}
  };

  const search = (rows) => {
    var o;
    if (localStorage.getItem("user_role") === "ROLE_ETUDIANT")
      o = rows.map(
        (row) => row.utilisateur.email === localStorage.getItem("user_email")
      );
    const output = o.filter((row) =>
      searchColumns.some((column) => {
        return (
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(searchValue.toLocaleLowerCase()) > -1
        );
      })
    );
    return output;
  };

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      setFile(info.file);
    },
  };

  return (
    <div>
      {localStorage.getItem("user_role") === "ROLE_ETUDIANT" ? (
        <Modal
          title="Ajouter emploi du temps"
          visible={visible}
          onOk={ajouterRapport}
          onCancel={() => setVisible(false)}
        >
          <Form {...layout} name="basic">
            <Form.Item label="Sujet" name="name">
              <Input onChange={(value) => setSujet(value.target.value)} />
            </Form.Item>
            <Form.Item label="Structure d'accueil">
              <Select
                onChange={(value) => {
                  setIdStructure(value);
                }}
              >
                {structures.map((structure) => (
                  <Option value={structure.idStructure}>
                    {structure.nomStructure}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="filiere" name="name">
              <Input onChange={(value) => setfiliere(value.target.value)} />
            </Form.Item>

            <Form.Item label="fichier de l'emploi">
              <Dragger {...props} beforeUpload={() => false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Cliquez ou faites glisser le fichier dans cette zone pour
                  télécharger
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}

      <Navbar />
      <div className="container pt-4">
        <div className="form-inline" style={{ marginTop: "3%" }}>
          <h2
            className="font-weight-bold "
            style={{ marginRight: "10%", marginLeft: "2%" }}
          >
            Liste des depots
          </h2>

          <Search
            style={{ width: "35%", marginRight: "2%" }}
            onChange={(value) => setSearchValue(value.target.value)}
          />
          <Button
            type="primary"
            className="float-right"
            onClick={() => setVisible(true)}
          >
            <i class="fas fa-plus pr-sm-2"></i>Ajouter un rapport
          </Button>
        </div>
        {search(rapports).map((rapport) => (
          <RapportCard rapport={rapport} />
        ))}
      </div>
    </div>
  );
};

export default DepotList;
