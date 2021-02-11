import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button } from "antd";

const EtudiantLinks = ({history}) => {

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
      <NavLink to="/ConsulterSA" className={styles.login}>
        Structure d'accueil
      </NavLink>
      <Button
        href="/"
        onClick={deconnexion}
        shape="round"
        type="primary"
        style={{color:"white"}}
      >
        deconnexion
      </Button>
    </span>
  );
};

export default withRouter(EtudiantLinks);
