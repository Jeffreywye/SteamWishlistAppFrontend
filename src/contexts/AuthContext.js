import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider ( { children }) {
   const [_token, setToken] = useState()
   
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
        return data 
    }

    // useEffect (() =>{
    //     return function cleanup(){
    //         setToken("")
    //     }
    // }, [])

   const value = {
       _token,
       signup,
       login
   }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}