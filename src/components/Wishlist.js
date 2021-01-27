import React, {useState, useEffect} from "react"
import { Container, Button } from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import { MDBDataTable} from 'mdbreact'

const Wishlist = (props) => {
    const [_error, setError] = useState('')
    const [_loading, setLoading] = useState(true)
    const {_id, _token, logout, getWishlist, remFromList, addToList  } = useAuth()

    function handleLogout() {
        setError('')
        try{
            logout()
        }
        catch {
            setError('Failed to log out')
        }
    }

    useEffect (() =>{
        console.log("WishList on Mount")
        const getList = async () =>{
            const json = await getWishlist()
            setLoading(false)
        }
        getList()

    }, [])
    console.log('Wishlist rendered')

    return (
        <Container>
            {_loading &&
            <h2>LOADING...</h2>
            }
            {!_loading && 
            <div>
               <div>{_id}</div>
                <div>{_token}</div>
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>  
            </div>
            }
            
        </Container>
    )
}

export default Wishlist