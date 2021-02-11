import React, {createContext, useState} from 'react'

export const RapportsContext = createContext({});

const RapportsContextProvider = ({children}) => {
    const [rapports, setRapports] = useState([]);

    return(
        <RapportsContext.Provider value = {{rapports, setRapports}}>
            {children}
        </RapportsContext.Provider>
    )
}

export default RapportsContextProvider;