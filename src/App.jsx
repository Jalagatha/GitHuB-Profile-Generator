import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Details from './components/Details'
import NotFound from './components/NotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/users/:name' element={<Details />}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
