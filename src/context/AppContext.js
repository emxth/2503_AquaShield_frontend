import { createContext, useState } from "react";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):false)

    const value = {
        token,setToken,
        backendUrl
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider