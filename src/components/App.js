import React from "react"
import Signup from "./Signup"
import Login from "./Login"
import Wishlist from "./Wishlist"

import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Container 
          className="d-flex align-items-center justify-content-center"
          style = {{minHeight:"100vh" }}
          >
          <div 
            className="w-100"
            style = {{maxWidth: '400px'}}
          >
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/wishlist" component={Wishlist}/>
          </div>
        </Container>
        
      </AuthProvider>
    </Router>
  )
}

export default App;
