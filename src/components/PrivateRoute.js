import React, {useState , useEffect} from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const PrivateRoute = ({component: Component,  ...rest }) => {
    // const [_access, setAccess] = useState(false)
    const {verify} = useAuth()
    
    // const provideAccess = async () =>{
    //     let access = await verify()
    //     console.log(access)
    //     setAccess(access)
    // }
    
    // useEffect (() =>{
    //     await provideAccess()
    // }, [])

    return (
        <Route
            {...rest}
            render={props => {
                return verify() ? <Component {...props} /> : <Redirect to="/login"/>
            }}
        >
            
        </Route>
    )
}

export default PrivateRoute