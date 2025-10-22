import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import NavBar from './components/NavBar/NavBar';
import ProtectedRoutes from './components/ProtectedRoutes';

// Pages
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import UserPage from './pages/UserPage/UserPage';
import GamesPage from './pages/GamesPage/GamesPage';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';
import GameDetailsPage from './pages/GameDetailsPage/GameDetailsPage';

function App() {
  const [searchTerm, setSearchterm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/games" element={<GamesPage searchTerm={searchTerm} setSearchTerm={setSearchterm} setSelectedGame={setSelectedGame} />} />
        <Route path="/gamedetails" element={<GameDetailsPage selectedGame={selectedGame} />} />
        <Route path="/reviews" element={<ReviewsPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
