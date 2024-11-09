import React, { useState } from 'react'

import { axiosClient, errorHandler } from '../../utilities'


export default function LogIn() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function testAccess() {
        try {
            let response = await axiosClient.get('http://localhost:8080/protected')
            alert(response.data.msg)
        } catch (error) {
            errorHandler(error)
        }
    }

    async function logInUser() {
        if (email.length === 0)
            return alert('Email has been left blank!')
        if (password.length === 0)
            return alert('Password has been left blank!')

        try {
            let response = await axiosClient.post('http://localhost:8080/login', {
                email: email,
                password: password
            })
            alert(response.data.msg)
        } catch (error) {
            errorHandler(error)
        }
    }


    return <div>
        <h1>Log In</h1>
        <form>
            <div>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                <label for='email'> Email</label>
            </div>

            <div>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                <label for='password'> Password</label>
            </div>

            <button type='button' onClick={logInUser} >Log In</button>
            <button type='button' onClick={testAccess} >Test Access</button>
        </form>
    </div>
}
