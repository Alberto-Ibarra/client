import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Display = (props) => {
    //we desconstruct this for line 28
    const { products } = props

    const handleDelete = (deleteId)=>{
        axios.delete(`http://localhost:8000/api/products/${deleteId}`)
            .then(res=>{
                props.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <fieldset>
            <legend> All products</legend>
            <table>
                <thead>
                    <tr>
                        <th> product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i)=>(
                            <tr key={i}>
                                <td> <Link to={`/product/${product._id}`}>{product.title}</Link></td>
                                <td> <Link to={`/product/${product._id}/edit`} >Edit </Link></td>
                                <td> <button onClick={()=>handleDelete(product._id)}> Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </fieldset>
    )
}

export default Display