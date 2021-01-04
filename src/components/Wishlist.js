import React, {useState, useEffect} from "react"
import { Container, Button } from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'

const Wishlist = (props) => {
    const [error, setError] = useState('')
    const [verified, setVerified] = useState(false)
    const {_id, _token, logout, verify} = useAuth()
    

    function handleLogout() {
        setError('')
        try{
            logout()
        }
        catch {
            setError('Failed to log out')
        }
    }

    // const provideAccess = async () =>{
    //     let resp_json = await verify()
    // }

    useEffect (() =>{
        console.log("WishList on Mount")
    }, [])
    console.log('Wishlist rendered')
    return (
        <Container>
            Hello
            <div>{_id}</div>
            <div>{_token}</div>
            <Button variant="link" onClick={handleLogout}>
                Log Out
            </Button>
        </Container>
    )
}

export default Wishlist