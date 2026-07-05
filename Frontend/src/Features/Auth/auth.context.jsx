import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";



export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    loading: false,
    setLoading: () => {}
})

const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem('auth_user')
        return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
        return null
    }
}


export const AuthProvider = ({children})=>{

    const [user , setUser] = useState(getStoredUser())
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const getAndSetUser = async ()=>{
            try {
                const data = await getMe()
                setUser(data.user)
                localStorage.setItem('auth_user', JSON.stringify(data.user))
            } catch (error) {
                const storedUser = getStoredUser()
                setUser(storedUser)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()
    },[])

   

    return (
<AuthContext.Provider value={{user , setUser ,loading , setLoading} }>
    { children}
</AuthContext.Provider>

    )
 
}