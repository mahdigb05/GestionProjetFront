import React, {createContext, useState} from 'react'

export const UtilisateurContext = createContext({});

const UtilisateurContextProvider = ({children}) => {
    const [utilisateurs, setUtilisateurs] = useState([]);

    return(
        <UtilisateurContext.Provider value = {{utilisateurs, setUtilisateurs}}>
            {children}
        </UtilisateurContext.Provider>
    )
}

export default UtilisateurContextProvider;