import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"

const AuthContext = React.createContext()

const decodeToken = accessToken => {
    if (!accessToken) return {};
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider ( { children }) {
   const [_token, setToken] = useState()
   const [_id, setID] = useState()
   const history = useHistory()
   
    async function signup(email, password){
        let url = "http://localhost:5000/api/signup"
        let response = await fetch(url ,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, 'password':password})
        })
        let data = await response.json()
        return data 
    }

    async function login(email, password){
        let url = "http://localhost:5000/api/login"
        let response = await fetch(url ,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, 'password':password})
        })
        let data = await response.json()
        setToken(data['access_token'])
        let decodedToken = decodeToken(data['access_token'])
        setID(decodedToken['identity'])
        window.localStorage.setItem('accessToken',data['access_token'] )
        return data 
    }

    function logout(){
        setToken("")
        setID("")
        window.localStorage.removeItem('accessToken')
        history.push('/')
    }

    async function verify(){
        if (_token){
            const token = window.localStorage.getItem('accessToken')
            let jwt_decode = decodeToken(token)
            console.log(jwt_decode)
        }
        return false
    }

    useEffect (() =>{
        const token = window.localStorage.getItem('accessToken')
        let decodedToken = decodeToken(token)
        setToken(token)
        setID(decodedToken['identity'])


        return function cleanup(){
            setToken("")
            setID("")
        }
    }, [])

   const value = {
       _id,
       _token,
       signup,
       login,
       logout,
       verify
   }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}