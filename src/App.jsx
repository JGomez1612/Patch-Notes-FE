import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </>
  )
}

export default App
