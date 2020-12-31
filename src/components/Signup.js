import React from "react"
import {Form, Button, Card} from 'react-bootstrap'

const Signup = (props) => {
    return (
        <div>
            <Card>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="email" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button className="w-100" type="submit">Sign Up</Button>
                </Form>
            </Card>
            <div className = "w-100 text-center mt-2">
                Already have and account? Log in
            </div>
        </div>
    )
}