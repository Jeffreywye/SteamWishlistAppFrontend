import React, {useState, useEffect} from "react"
import { Container, Button } from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import { MDBDataTableV5} from 'mdbreact'

const Wishlist = (props) => {
    const [_data, setData] = useState(null)
    const [_error, setError] = useState('')
    const [_loading, setLoading] = useState(true)
    const {logout, getWishlist, remFromList, addToList  } = useAuth()
    const [_checklist, setChecklist] = useState(new Set())

    function handleLogout() {
        setError('')
        try{
            logout()
        }
        catch {
            setError('Failed to log out')
        }
    }

    function removeGames(event){
        event.preventDefault()
        console.log(_checklist);
    }

    function getCheckBox(e){
        if (e['checked'] && !_checklist.has(e["appID"])){
            setChecklist(_checklist.add(e["appID"]))
        }
        else if(!e['checked'] && _checklist.has(e['appID'])){
            setChecklist(()=>{
              let clone = cloneSet(_checklist)
              if (clone.delete(e['appID'])){
                return clone
              }
              else{
                return _checklist
              }
            })
        }
    }

    function getAllCheckBoxes(e){
        let set = new Set()
        if (e.length > 0 && e[0]['checked']){
            e.forEach(element => {
                set.add(element['appID'])
            })
        }
        setChecklist(set)
        
    }

    const cloneSet = (set) => {
        const ret = new Set()
        for (let item of set){
            ret.add(item)
        }
        return ret
    }

    useEffect (() =>{
        console.log("WishList on Mount")
        const getList = async () =>{
            const json = await getWishlist()
            if (json['status']){
                setData(json['data'])
                console.log(json['data'])
            }
            else {

            }
            setLoading(false)
        }
        getList()
    }, [])
    


    return (
        <Container>
            {_loading &&
            <h2>LOADING...</h2>
            }
            {!_loading && 
            <div>
                <Button variant="outline-primary" onClick={removeGames}>
                    Remove
                </Button>
                <MDBDataTableV5
                    checkbox
                    headCheckboxID='id5'
                    bodyCheckboxID='checkboxes5'
                    multipleCheckboxes
                    getValueCheckBox={getCheckBox}
                    getValueAllCheckBoxes={getAllCheckBoxes}
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