import React, {useState , useEffect} from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const PrivateRoute = ({component: Component,  ...rest }) => {
    const [_authorized, setAuthorized] = useState(false)
    const [_loading, setLoading] = useState(true)
    const {verify} = useAuth()
    
    console.log("Private Route Render")
    useEffect (() =>{
        const checkAuthorization = async () =>{
            const result = await verify()
            setAuthorized(result)
            setLoading(false)
        }
        checkAuthorization()
        console.log("Private Route Effect called")
    }, [])

    return (
        <Route
            {...rest}
            render={props => {
                if (_authorized){
                    return <Component {...props} />
                }
                else if (_loading){
                    return <h2>LOADING...</h2>
                }
                else{
                    return <Redirect to="/login"/>
                }
                // return verify() ? <Component {...props} /> : <Redirect to="/login"/>
            }}
        >
            
        </Route>
    )
}

export default PrivateRoute