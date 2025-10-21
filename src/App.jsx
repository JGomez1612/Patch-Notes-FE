import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './components/NavBar/NavBar';

// Pages
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import UserPage from './pages/UserPage/UserPage';
import GamesPage from './pages/GamesPage/GamesPage';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';

function App() {
    const [searchTerm, setSearchterm] = useState("");

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/games" element={<GamesPage searchTerm={searchTerm} setSearchTerm={setSearchterm}/>} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </>
  )
}

export default App
