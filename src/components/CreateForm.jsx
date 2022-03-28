import React, { useState } from 'react'
import axios from "axios"

const CreateForm = (props) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/products`, {title, price, description})
            .then(res=>{
                props.reload()
                clearForm()
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors
                const errorArr =[]
                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key]["message"])
                }
                setErrors(errorArr)
            })

    }

    const clearForm = () =>{
        setTitle("")
        setPrice(0)
        setDescription("")
    }

    return (
        <fieldset>
            <legend> Form</legend>
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
            {
                errors.map((err, i) => (
                    <p key={i} style={{ color: "red" }}>{err}</p>
                ))
            }
        </fieldset>
    )
}

export default CreateForm