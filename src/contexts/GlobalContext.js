import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [rapports, setRapports] = useState([]);
  const [structures, setStructures] = useState([]);
  const [archive, setArchive] = useState([]);

  const getRessourceFromApi = async (endpoint, stateSetter) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    var retrievedData = new Array();
    try {
      retrievedData = await axios.get(endpoint, { headers: headers });
      stateSetter([...retrievedData.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getArchive = async () => {
    var payload = new FormData();
    payload.append("archive", true);
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    var retrievedData;
    try {
      retrievedData = await axios.get(
        "http://localhost:8080/rapport",
        payload,
        { headers: headers }
      );
      setArchive(...retrievedData.data);
    }
    catch(err){
        console.log(err);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        rapports,
        setRapports,
        getRessourceFromApi,
        structures,
        setStructures,
        getArchive,
        archive
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
