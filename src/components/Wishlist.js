import React, {useState, useEffect, useRef} from "react"
import { Container, Button, Form, Row, Col} from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import { MDBDataTableV5, MDBBtn} from 'mdbreact'

const Wishlist = (props) => {
    const [_data, setData] = useState("")
    const [_error, setError] = useState('')
    const [_loading, setLoading] = useState(true)
    const {logout, getWishlist, remFromList, addToList  } = useAuth()
    const [_delete, setDelete] = useState(null)
    const textRef = useRef()

    function handleLogout() {
        setError('')
        try{
            logout()
        }
        catch {
            setError('Failed to log out')
        }
    }

    async function toggleToSet(event){
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

    async function handleSubmit(event){
        event.preventDefault()
        console.log("test")
        try{
            setError("")
            setLoading(true)
            
            // let resp_json = await login(emailRef.current.value, passwordRef.current.value)
            // if (resp_json["type"] === 'error'){
            //     setError(resp_json['msg'])
            // }
            // else{
            //     history.push('/wishlist')   
            // }
        }
        catch (e){
            // alert(e.message)
            setError("Failed to add app")
        }
        setLoading(false)
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
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <Button variant="link" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </Col>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Col>
                                        <Form.Group id="appID">
                                            <Form.Control type="text" ref={textRef} required></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="w-100" 
                                            type="submit"
                                            >Add
                                        </Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                 
                <MDBDataTableV5
                    data={_data}
                />
            </div>
            }
            
        </Container>
    )
}

export default Wishlist