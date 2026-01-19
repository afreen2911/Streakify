import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-600">Streakify</h1>
        <button className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>

    </nav>
  )
}

export default Navbar
