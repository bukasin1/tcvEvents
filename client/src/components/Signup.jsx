import React, { useState } from 'react'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [interests, setInt] = useState('')
  const [error, setError] = useState('')

  const categories = ["AI", "MOBILE DEVELOPMENTS", "ROBOTICS"]

  const handleChange = (e) => {
    if (e.target.name === 'email') setEmail(e.target.value)
    if (e.target.name === 'password') setPass(e.target.value)
    if (e.target.name === 'interests') setInt(e.target.value)
  }

  const addInt = (e) => {
    console.log(e.target.textContent)
    setInt(`${interests}${e.target.textContent}, `)
  }

  const data = {
    email, password, interests
  }

  const signupUser = (e) => {
    e.preventDefault()
    // setEvents(["first"])
    fetch("http://localhost:3003/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "data found")
        if (data.message) {
          alert("Successfully signed up. Login to continue")
          setEmail('')
          setPass('')
          setInt('')
        } else {
          setError(data.error_message)
          setEmail('')
          setPass('')
          setInt('')
        }
      })
      .catch(error => {
        console.log(error, "error fetching")
      })
  }

  return (
    <div>
      <h3>Signup Form</h3>
      <form onSubmit={signupUser} >
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="email" name='email' value={email} />
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" name='password' value={password} />
        <label htmlFor="interests">Interests</label>
        <input onChange={handleChange} type="text" name='interests' value={interests} readOnly />
        <input type="submit" value="SignUp" />
        <p>Select from the list of interests below. Click to select</p>

        <p>{error}</p>
      </form>
      {categories.map((cat, index) => (
        <p key={index} onClick={addInt}>{cat}</p>
        ))}
      <p>already have an account? <a href="/login">LogIn</a></p>
      <div>
        <a href='/'>Back</a>
      </div>
    </div>
  )
}

export default Signup