import React from "react"
import Signup from "./Signup"
import Login from "./Login"
import Wishlist from "./Wishlist"

import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/wishlist" component={Wishlist}/>
      </AuthProvider>
    </Router>
  )
}

export default App;
