import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/renewal.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard/>}/>
            
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
