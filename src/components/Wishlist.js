import React, {useState, useEffect} from "react"
import { Container } from "react-bootstrap";
import {useAuth} from '../contexts/AuthContext'

const Wishlist = (props) => {
    const {_id, _token, logout} = useAuth()
    
    return (
        <Container>
            Hello
            <div>{_id}</div>
            <div>{_token}</div>
        </Container>
    )
}

export default Wishlist