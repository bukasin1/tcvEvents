import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddEvent() {
    const token = localStorage.getItem("tcv-token");
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [description, setDescr] = useState('')
    const [address, setAdd] = useState('')
    const [category, setCat] = useState('')
    const [date, setDate] = useState('')
    const [isVirtual, setIsVirt] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'title') setTitle(e.target.value)
        if(e.target.name === 'description') setDescr(e.target.value)
        if(e.target.name === 'address') setAdd(e.target.value)
        if(e.target.name === 'category') setCat(e.target.value)
        if(e.target.name === 'date') setDate(e.target.value)
    }

    const handleRadio = (e) => {
        if(isVirtual) setIsVirt(false)
        else setIsVirt(true)
    }

    const data = {
        title, description, address, category, date, isVirtual
    }

    const addEvent = (e) => {
        e.preventDefault()
        console.log(data)
        fetch("http://localhost:3003/api/v1/events/admin/add-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, "data found")
                if(data.message) alert("Event created!")
                else setError(data.error_message)
            })
            .catch(error => {
                console.log(error, "error fetching")
            })
    }

    const clear = () => {
        setTitle('')
        setAdd('')
        setCat('')
        setDate('')
        setDescr('')
        setIsVirt(false)
        setError('')
    }

    const logout = () => {
        localStorage.removeItem("tcv-token")
        navigate("/login")
      }

    useEffect(() => {
        if (!token) {
            console.log(token, "protected");
            navigate("/login")
        }
    }, [])
    return (
        <div>
            <h3>Add event</h3>
            <p onClick={logout}>logout</p>
            <form onSubmit={addEvent}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} type="text" name='title' value={title} />
                <label htmlFor="description">Description</label>
                <input onChange={handleChange} type="text" name='description' value={description} />
                <label htmlFor="description">Category</label>
                <select onChange={handleChange} name="category" value={category} id="">
                    <option value="">----</option>
                    <option value="AI">AI</option>
                    <option value="MOBILE DEVELOPMENTS">MOBILE DEVELOPMENTS</option>
                    <option value="ROBOTICS">ROBOTICS</option>
                </select>
                <label htmlFor="address">Address</label>
                <input onChange={handleChange} type="text" name='address' value={address} />
                <label htmlFor="date">Date</label>
                <input onChange={handleChange} type="date" name='date' value={date} />
                <label htmlFor="isVirtual">Virtual</label>
                <input onClick={handleRadio} type="radio" name='isVirtual' checked={isVirtual} />
                <input type="submit" value="Create event" />
                <p onClick={clear}>clear</p>
                <p>{error}</p>
            </form>

            <div>
                <a href='/'>Back</a>
            </div>
        </div>
    )
}

export default AddEvent