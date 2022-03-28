//grab id from params
//using the id, axios
//useEffect, useState
import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ShowOne = () => {
    const {id} = useParams() //destructure id from params
    const [product, setProduct]= useState()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res=>setProduct(res.data) )
        .catch(err=> console.log(err))
    },[])

    return (
        <div>
            {
                product?
                <div>
                    <h3>{product.title}</h3>
                    <h3> Price: {product.price}</h3>
                    <h3> Description: {product.description}</h3>
                </div>:
                <h1>loading</h1>
            }
        </div>
    )
}

export default ShowOne
