//getOne + create
//grab id from params (useParasms)
// using the id, axios, useEffect, useState (grab from backend)
//form, input (useState)
// history: redirect

import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const Edit = () => {
    const {id} = useParams() 
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const history = useHistory()
    const [errors, setErrors] = useState([])


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res=>{
            // pre populate data in edit form. *requires value={} in input form
            const product = res.data
            setTitle(product.title)
            setPrice(product.price)
            setDescription(product.description)
        })
        .catch(err=> console.log(err))
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/products/${id}`, {title, price, description})
            .then(res=>{
            history.push("/") //this will redirect you
        })
            .catch(err=>{
                const errorResponse = err.response.data.errors
                const errorArr = []
                for( const key of Object.keys(errorResponse)){ // key = "title"
                    errorArr.push(errorResponse[key]["message"]) 
            }
            setErrors(errorArr)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Title</label>
                    <input type="text" name="title" value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label> price</label>
                    <input type="number" name="price" value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label> Description</label>
                    <input type="text" name="description" value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button> Submit</button>
            </form>
        </div>
    )
}

export default Edit
