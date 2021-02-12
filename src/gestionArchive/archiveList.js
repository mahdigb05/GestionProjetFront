import { message, Form, Modal, Input, Select, Upload, Button } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import RapportCard from "./rapportCard";
import { InboxOutlined } from "@ant-design/icons";
import Navbar from "../navBar/NavBar";
import uuid from "uuid/dist/v4";

const { Option } = Select;
const { Dragger } = Upload;
const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ArchiveList = () => {
  const [searchValue, setSearchValue] = useState("");
  const { rapports, setRapports,getRessourceFromApi } = useContext(GlobalContext);

  const searchColumns = ["sujet", "filiere"];

  useEffect(() => {
    getRessourceFromApi("http://localhost:8080/rapport",setRapports)
  }, []);

  const search = (rows) => {
    const o = rows.filter(row => row.archive === true);
    
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

  return (
    <div>
      <Navbar />
      <div className="container pt-4">
      <div className="form-inline" style={{ marginTop: "3%" }}>
        <h2
          className="font-weight-bold "
          style={{ marginRight: "10%", marginLeft: "2%" }}
        >
          Archive des rapports
        </h2>

        <Search
          style={{ width: "35%", marginRight: "2%" }}
          onChange={(value) => setSearchValue(value.target.value)}
        />
      </div>
      {search(rapports).map((ar) => (
        <RapportCard rapport={ar} key={uuid()}/>
      ))}
    </div>
    </div>
  );
};

export default ArchiveList;
