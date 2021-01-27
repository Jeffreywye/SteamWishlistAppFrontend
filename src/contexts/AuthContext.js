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
        window.localStorage.setItem('refreshToken', data['refresh_token'])
        return data 
    }

    function logout(){
        setToken("")
        setID("")
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
        history.push('/')
    }

    async function refreshToken(token){
        let url = "http://localhost:5000/token/refresh"
        let response = await fetch(url ,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token 
            }
        })
        let data = await response.json()
        setToken(data['access_token'])
        window.localStorage.setItem('accessToken',data['access_token'] )
        console.log("set new token from refresh")
    }

    async function verify(){
        const token = window.localStorage.getItem('accessToken')
        console.log("Called Verify")
        console.log(_token)
        console.log(_id)
        // check if token is available
        if (token){
            let jwt_decode = decodeToken(token)
            if (Date.now() >= jwt_decode['exp']*1000){
                // access expires
                let refresh_token = window.localStorage.getItem('refreshToken')
                if (refresh_token){
                    // refresh token found
                    let refresh_decode = decodeToken(refresh_token)
                    if (Date.now() >= refresh_decode['exp']*1000){
                        // refresh expired
                        console.log('refresh expired')
                        window.localStorage.removeItem('accessToken')
                        window.localStorage.removeItem('refreshToken')
                    }
                    else {
                        // refresh did not expire, so get a new token
                        await refreshToken(refresh_token)
                        return true
                    }
                }
                else{
                    // no refresh token to be found
                    window.localStorage.removeItem('accessToken')
                }
            }
            else{
                // access did not expire
                return true
            }
        }
        return false
    }

    async function getWishlist(){

    }
    
    async function remFromList(){

    }

    async function addToList(){

    }

    useEffect (() =>{
        console.log("Auth Context Effect")
        const token = window.localStorage.getItem('accessToken')
        let decodedToken = decodeToken(token)
        setToken(token)
        setID(decodedToken['identity'])


        return function cleanup(){
            console.log("Auth States cleared")
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
       verify,
       getWishlist,
       remFromList,
       addToList
    }
    console.log("AuthContext Rendered")
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}