import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'email') setEmail(e.target.value)
    if (e.target.name === 'password') setPass(e.target.value)
  }

  const data = {
    email, password
  }

  const loginUser = (e) => {
    e.preventDefault()
    fetch("http://localhost:3003/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "data found")
        if(data.token){
          alert("Successfully logged in")
          localStorage.setItem("tcv-token", data.token)
          if(data.user.admin) navigate('/addevent')
          else navigate('/dashboard')
        }else{
          setError(data.error_message)
          setEmail('')
          setPass('')
        }
      })
      .catch(error => {
        console.log(error, "error fetching")
      })
  }

  return (
    <div>
      <h3>Login Form</h3>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} name="email" type="email" value={email} />
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" name='password' value={password} />
        <input type="submit" value="Log in" />
        <p>{error}</p>
      </form>
      <p>dont have an account? <a href="/signup">Sign up</a></p>

      <div>
        <a href='/'>Back</a>
      </div>
    </div>
  )
}

export default Login