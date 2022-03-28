
import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [products, setProducts] = useState()
    const history = useHistory()
    const [refresh, setRefresh] = useState(true)

useEffect(()=> {
    axios.get(`http://localhost:8000/api/products`)
    .then(res=>setProducts(res.data))
    .catch(err=>console.log(err))
}, [refresh])

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/products`, {title, price, description})
            .then(res=>{
                history.push("/")
                setRefresh(!refresh)
            })
            .catch(err=>console.log(err))
    }

    return (
        <fieldset>
            <legend>Products</legend>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>title</label>
                    <input type="text" name="title" value={title}
                    onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>price</label>
                    <input type="number" name="price" value={price}
                    onChange={e=>setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>description</label>
                    <input type="text" name="description" value={description}
                    onChange={e=>setDescription(e.target.value)}
                    />
                </div>
                <button>Submit</button>
            </form>
            <hr></hr>
            <div>
                <h1>All Products: </h1>
                <table>
                    <thead>
                        <tr>
                            {/* <th>Title</th> */}
                            {/* <th>Price</th>
                            <th>Description</th> */}
                            {/* <th colSpan={2}>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products &&
                                products.map((product, i)=>(
                                    <tr key={i}>
                                        <td><Link to={`/product/${product._id}`}>{product.title}</Link></td>
                                        {/* <td>{product.price}</td>
                                        <td>{product.description}</td> */}
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </fieldset>
    )
}

export default Create
