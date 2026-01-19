import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <h2>E-mail</h2>
        <input type="email" placeholder='abc@gmail.com' className="w-full border p-2 rounded mb-3"/>
        <h2>Password</h2>
        <input type="password" placeholder='Enter Password' className="w-full border p-2 rounded mb-4"/>
        <button className="w-full bg-green-600 text-white py-2 rounded">Create Account</button>
        <p className="text-sm text-center mt-4">Already have an Account?
            <Link to="/" className="text-green-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
