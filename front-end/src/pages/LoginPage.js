import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const logInUser = () => {
    if (username.length === 0)
      return alert("Username has been left blank!")
    if (password.length === 0)
      return alert("Password has been left blank!")

    axios.post('http://localhost:8080/login', {
      username: username,
      password: password
    })
      .then((response) => {
        navigate("/")
      })
      .catch((error) => {
        if(error.status === 401) {
          alert(error.response.data.msg)
        } else {
          alert("Error has ocurred")
          console.log(error)
        }
      })
  }

  
  return (<div>
    <h1>Login</h1>
    <form action="/login" method="post">

      <div>
        <input type="username" onChange={(e) => setUsername(e.target.value)} />
        <label for="username"> Username</label>
      </div>

      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label for="password"> Password</label>
      </div>

      <button type="button" onClick={logInUser} >Log In</button>
      
    </form>
  </div>)
}
