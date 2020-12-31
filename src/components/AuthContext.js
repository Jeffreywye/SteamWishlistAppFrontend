import React, { useContext, useState } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider ( { children }) {
   const [_currentUser, setCurrentUser] = useState()
   
    async function signup(email, password){
        url = "localhost:5000/api/signup"
        let response = await fetch(url ,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, 'password':password})
        })

        return response.json() 
    }

   const value = {
       _currentUser
   }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}