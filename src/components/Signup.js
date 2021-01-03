import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import { Link } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'


const Signup = (props) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    
    const [_error, setError] = useState('')
    const [_msg, setMsg] = useState('')
    const [_loading, setLoading] = useState(false)

    async function handleSubmit(event){
        event.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }
        try{
            setMsg("")
            setError("")
            setLoading(true)
            
            let resp_json = await signup(emailRef.current.value, passwordRef.current.value)
            if (resp_json["type"] === 'error'){
                setError(resp_json['msg'])
            }
            else{
                setMsg(resp_json['msg'])    
            }
        }
        catch{
            setError("Failed to create account")
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
                        <h2 className="text-center mb-4">Sign Up</h2>
                        { _error && 
                        <Alert variant="danger">
                            {_error}
                        </Alert>
                        }
                        { _msg && 
                        <div>
                            <Alert variant="success">
                                {_msg}
                            </Alert>
                            <div className = "w-100 text-center mt-2">
                                 Login  <Link to="/login">Here</Link>
                            </div>
                        </div>
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
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                            </Form.Group>
                            <Button 
                                className="w-100" 
                                type="submit"
                                disabled={_loading}
                                >Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className = "w-100 text-center mt-2">
                    Already have and account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </Container>
    )
}

export default Signup