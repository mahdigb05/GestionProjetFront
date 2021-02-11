import React, {createContext, useState} from 'react'

export const SAContext = createContext({});

const SAContextProvider = ({children}) => {
    const [SA, setSA] = useState([]);

    return(
        <SAContext.Provider value = {{SA, setSA}}>
            {children}
        </SAContext.Provider>
    )
}

export default SAContextProvider;