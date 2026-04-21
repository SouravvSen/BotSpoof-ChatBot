import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Bot from './component/Bot'
import Login from './component/Login'
import Signup from './component/Signup'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Bot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
