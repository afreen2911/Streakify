import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate();

  function handleLogin(){
    localStorage.setItem("isLoggedIn","true");
    navigate("/dashboard")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <p>E-mail</p>
        <input type="email" placeholder='abc@gmail.com' className="w-full border p-2 rounded mb-3" />
        <p>Password</p>
        <input type="password" placeholder='Enter Password' className="w-full border p-2 rounded mb-4"/>
        <button onClick={(handleLogin)} className="w-full bg-purple-600 text-white py-2 rounded">Login</button>
        <p className="text-sm text-center mt-4">Don't have an Account?
          <Link to={"/register"} className="text-purple-600 font-medium">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
