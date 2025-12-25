import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const dataContext = createContext()

function UserContext({ children }) {
    let serverUrl = "https://google-photos-server.onrender.com"
    let [userData, setUserData] = useState(null)

    let getme = async () => {
        try {
            let result = await axios.get(`${serverUrl}/auth/getme`, { withCredentials: true })
            console.log(result)
            setUserData(result.data)
        } catch (error) {
            console.log(`getme axios error: ${error}`)
        }
    }

    useEffect(() => {
        getme()
    }, [])

    const value = {
        serverUrl,
        userData,
        setUserData
    }
    return (
        <div>
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
        </div>
    )
}

export default UserContext
