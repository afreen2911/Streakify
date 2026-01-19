import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

import HabitCard from "./components/HabitCard"

const App = () => {
  return (
    <div>
      <HabitCard/>
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} /> 
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
