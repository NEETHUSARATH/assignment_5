import React, { createContext, useState } from 'react'


export const adddata = createContext("");
export const deldata = createContext("");

const ContextProvider = ({ children }) => {

    const [userdata, setUserdata] = useState("");
    const [dltdata, setDLTdata] = useState("");


    return (
        <adddata.Provider value={{ userdata, setUserdata }}>
            
                <deldata.Provider value={{dltdata, setDLTdata}}>
                    {children}
                </deldata.Provider>

            

        </adddata.Provider>
    )
}

export default ContextProvider;