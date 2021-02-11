import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button } from "antd";

const AgentLinks = ({history}) => {


  const deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email")
    history.push('/');
  }

  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/depots" className={styles.login}>
        Depots
      </NavLink>
      <NavLink to="/archive" className={styles.login}>
        Archive
      </NavLink>
      <NavLink to="/GestionUtilisateur" className={styles.login}>
        Utilisateurs
      </NavLink>
      <NavLink to="/GestionSA" className={styles.login}>
        Structure d'accueil
      </NavLink>
      <Button
        href="/"
        shape="round"
        onClick={deconnexion}
        type="primary"
        style={{color:"white"}}
      >
        deconnexion
      </Button>
    </span>
  );
};

export default withRouter(AgentLinks);
