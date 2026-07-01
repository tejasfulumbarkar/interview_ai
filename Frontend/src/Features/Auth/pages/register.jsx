import React from 'react'
import { useNavigate ,Link } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'
import { register } from '../services/auth.api'
import { useState } from 'react'
const Register = () => {


 const navigate = useNavigate()

  const {loading , handleRegister} = useAuth()
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault()

    await handleRegister({username,email,password})
    navigate('/')

  }

   if(loading){
    return (<main><h1>Loading ......</h1></main>)
  }
  return (
   <main>

    <div className="form-container">
      <h1>Register</h1>


      <form action="" onSubmit={handleSubmit}>
        <div className='inputs-container'>

          <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
          onChange={(e)=>{setUsername(e.target.value)}}
          type='text' id="username" name='username' placeholder='Enter Username'/>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input

          onChange={(e)=>{setEmail(e.target.value)}}
          
          type='email' id="email" name='email' placeholder='Enter Email Address'/>
        </div>

          <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
          onChange={(e)=>{setpassword(e.target.value)}}
          
          type='password' id="password" name='password' placeholder='Enter Email Address'/>
        </div>
        </div>

        <button className='button primary-button'>Register</button>
      </form>
      <p>Already have an Account ? <Link to={"/login"}>Login</Link></p>
    </div>


   </main>
  )
}

export default Register