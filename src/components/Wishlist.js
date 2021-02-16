import React, {useState, useEffect} from "react"
import { Container, Button } from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import { MDBDataTableV5, MDBBtn} from 'mdbreact'

const Wishlist = (props) => {
    const [_data, setData] = useState("")
    const [_error, setError] = useState('')
    const [_loading, setLoading] = useState(true)
    const {logout, getWishlist, remFromList, addToList  } = useAuth()
    const [_delete, setDelete] = useState(null)

    function handleLogout() {
        setError('')
        try{
            logout()
        }
        catch {
            setError('Failed to log out')
        }
    }

    function toggleToSet(event){
        console.log(_data)
        console.log(event.target.attributes)
        var id = parseInt(event.target.attributes['data-id'].nodeValue, 10)
        setDelete(id)
        setLoading(true)
    }
        

    const createDataTemplate = () => {
        let data = {}
        data['columns'] = [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc'
            },{
                label: 'AppID',
                field: 'appID',
                sort: 'asc'
            },{
                label: 'Init Price',
                field: 'init_price',
                sort: 'asc'
            },{
                label: 'Price Now',
                field: 'final_price',
                sort: 'asc'
            },{
                label: 'Discount Percent',
                field: 'discount',
                sort: 'asc'
            },{
                label: 'Remove',
                field: "rem"
            }]
        data['rows'] = []
        return data
    }

    useEffect (() =>{
        // console.log("WishList on Mount")
        const getList = async () =>{
            const json = await getWishlist()
            if (json['status']){
                let data = createDataTemplate()
                for (let i = 0; i < json['data'].length; i++) {
                    json['data'][i]['rem'] = <MDBBtn color='primary' onClick={toggleToSet} data-id={json['data'][i]['appID']}>remove</MDBBtn>
                }
                data['rows'] = json['data']
                setData(data)
                // console.log(data)
            }
            else {

            }
            setLoading(false)
        }
        getList()
    }, [])

    useEffect (() => {
        console.log("effect")
        console.log(_data)
        if (_delete !== null){
            console.log("must del " + _delete.toString())
            let data = createDataTemplate()
            data['rows'] = _data['rows'].filter((val, index, arr) =>{
                return _delete !== val['appID']
            })
            setData(data)

            setDelete(null)
            setLoading(false)
        }
    }, [_delete])
    


    return (
        <Container>
            {_loading &&
            <h2>LOADING...</h2>
            }
            {!_loading && 
            <div>
                <MDBDataTableV5
                    data={_data}
                />
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>  
            </div>
            }
            
        </Container>
    )
}

export default Wishlist