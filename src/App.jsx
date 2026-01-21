import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} /> 
        <Route path="/dashboard" element={<ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    } />
      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
