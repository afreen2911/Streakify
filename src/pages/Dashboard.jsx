import React from 'react'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <Navbar/>
    <div className="text-2xl font-bold mb-4">
        <h2>Your Habits</h2>
        <p className="text-gray-600">No habits yet. Start building your streak 🚀</p>
    </div>
    </div>
  )
}

export default Dashboard
