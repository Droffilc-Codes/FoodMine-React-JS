import  { useState, createContext, useContext } from 'react'
import * as userService from '../Services/userService'
import { toast } from 'react-toastify'

const AuthContext = createContext(null) 

export const AuthProvider = ({children})=> {
    const [user, setUser] = useState(userService.getUser())

    const login = async (email, password) => {
        try{
            const user = await userService.login(email, password)
            setUser(user)
            toast.success('Login Successful')
        }catch (err) {
            toast.error(err.response.data)
        }
    }


    const register = async data => {
        try{
            const user = await userService.register(data)
            toast.success('Registeration Successful')
        } catch (err){
            toast.error(err.response.data)
        }
    }




    const logout = () =>{
        userService.logout()
        setUser(null)
        toast.success('Logout Successful')
    }


    const updateProfile = async user =>{
        const updatedUser = await userService.updateProfile(user)
        toast.success('Profile successfully Updated!')
        if(updatedUser) setUser(updatedUser)
    }


    const changePassword = async passwords => {
        await userService.changePassword(passwords)
        logout()
        toast.success('Password Changes Successfully, Please Login Again!')
    }


    return(
        <AuthContext.Provider value={{user, login, logout, register, updateProfile, changePassword}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)