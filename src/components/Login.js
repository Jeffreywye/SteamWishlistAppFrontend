import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'

const Login = (props) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const history = useHistory()

    const [_error, setError] = useState('')
    const [_loading, setLoading] = useState(false)

    async function handleSubmit(event){
        event.preventDefault()

        try{
            setError("")
            setLoading(true)
            
            let resp_json = await login(emailRef.current.value, passwordRef.current.value)
            if (resp_json["type"] === 'error'){
                setError(resp_json['msg'])
            }
            else{
                history.push('/wishlist')   
            }
        }
        catch (e){
            alert(e.message)
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return (
        <Container 
            className="d-flex align-items-center justify-content-center"
            style = {{minHeight:"100vh" }}
            >
            <div 
                className="w-100"
                style = {{maxWidth: '400px'}}
            >
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        { _error && 
                        <Alert variant="danger">
                            {_error}
                        </Alert>
                        }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required></Form.Control>
                            </Form.Group>
                            <Button 
                                className="w-100" 
                                type="submit"
                                disabled={_loading}
                                >Log In</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className = "w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </Container>
    )
}

export default Login