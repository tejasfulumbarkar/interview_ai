import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login , register , logout } from "../services/auth.api"


export const useAuth = ()=>{

    const context  = useContext(AuthContext)
    if (!context) {
        return {
            user: null,
            loading: false,
            handleLogin: async () => null,
            handleRegister: async () => null,
            handleLogout: async () => null
        }
    }
    const {user,setUser , loading ,setLoading} = context


    const handleLogin = async ({email,password})=>{

        setLoading(true)
        try {
        const data = await login({email,password})
        setUser(data.user)
        localStorage.setItem('auth_user', JSON.stringify(data.user))
        return data.user
            
        } catch (error) {
            throw error
        }
        finally{
            setLoading(false)

        }

       
        
    }


    const handleRegister = async({username,email,password}) =>{
          setLoading(true)
        try {
           
        const data =await  register({username , email ,password}) 
        setUser(data.user)
        localStorage.setItem('auth_user', JSON.stringify(data.user))
        return data.user
            
        } catch (error) {
            throw error
        } finally{
               setLoading(false)

        }

       
     

    }


    const handleLogout = async ()=>{

        setLoading(true)
        try {
        await logout()
        setUser(null)
        localStorage.removeItem('auth_user')
            
        } catch (error) {
            throw error

        } finally{

            setLoading(false)

        }

    }


           return {user, loading , handleLogin , handleRegister , handleLogout}
}