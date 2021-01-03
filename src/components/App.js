import React from "react"
import Signup from "./Signup"
import Login from "./Login"
import Wishlist from "./Wishlist"
import PrivateRoute from "./PrivateRoute"

import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/wishlist" component={Wishlist}/>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
