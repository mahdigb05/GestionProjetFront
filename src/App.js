import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ConsulterRapports from './Rapports/ConsulterRapports';
import ConsulterSA from './StructuresAccueils/ConsulterSA';
import GestionSA from './StructuresAccueils/GestionSA';
import ajouterSA from './StructuresAccueils/ajouterSA';
import SAContextProvider from './contexts/SAContext';
import GlobalContextProvider from './contexts/GlobalContext'
import UtilisateurContextProvider from './contexts/UtilisateurContext';

import modifierSA from "./StructuresAccueils/modifierSA";
import GestionUtilisateur from './utilisateur/GestionUtilisateur'
import ajouterUtilisateur from './utilisateur/ajouterUtilisateur'
import modifierUtilisateur from './utilisateur/modifierUtilisateur'

import DepotList from './gestionDepot/gestionDepot';
import ArchiveList from './gestionArchive/archiveList';
import LoginForm from "./loginPage/loginForm"
import SignUp from './signupPage/signUp';

const App = () => {
  return (
    <BrowserRouter>
    <GlobalContextProvider>
    <UtilisateurContextProvider>
      <SAContextProvider>
        <Switch>
        <Route exact path='/ConsulterRapports' component={ConsulterRapports} />  
            <Route exact path='/ConsulterSA' component={ConsulterSA} />  
            <Route exact path='/GestionSA' component={GestionSA} />   
            <Route exact path='/AjouterSA' component={ajouterSA} />  
            <Route exact path='/ModifierSA' component={modifierSA} />
            <Route exact path='/GestionUtilisateur' component={GestionUtilisateur} />  
            <Route exact path='/AjouterUtilisateur' component={ajouterUtilisateur} />
            <Route exact path='/ModifierUtilisateur' component={modifierUtilisateur} />
          <Route exact path='/depots' component={DepotList} />
          <Route exact path='/archive' component={ArchiveList} />
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/inscription' component={SignUp} />
        </Switch>
      </SAContextProvider>
      </UtilisateurContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
