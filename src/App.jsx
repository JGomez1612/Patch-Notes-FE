import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './components/NavBar/NavBar';

// Pages
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import GamesPage from './pages/GamesPage';
import ReviewsPage from './pages/ReviewsPage';

function App() {

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
