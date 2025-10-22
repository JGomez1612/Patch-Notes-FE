import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import "./GamesPage.css"
import axios from "axios";

export default function GamesPage({ searchTerm, setSearchTerm, setSelectedGame }) {
    const [games, setGames] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        async function getGames() {
            try {
                const apiKey = import.meta.env.VITE_RAWG_API_KEY;
                const res = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`);


                setGames(res.data.results);
            } catch (err) {
                console.error(err.message)
            }
        }
        getGames();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const apiKey = import.meta.env.VITE_RAWG_API_KEY;
            const res = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}&page_size=40`);

            setGames(res.data.results);
        } catch (err) {
            console.error(err.message)
        }
    };

    const handleSelect = (game) => {
        setSelectedGame(game);
        nav("/gamedetails")
    }

    return (
        <div className="container">
            <div className="header">
                <h1 className="gamesGalleryTitle">Games Gallery</h1>
                <form onSubmit={handleSearch} className="searchBar">
                    <input
                        type="text"
                        placeholder="Search Games..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="games">
                {games.length === 0 ? (
                    <p>No games found.</p>
                ) : (
                    games.map((g) => (
                        <GameCard key={g.id} game={g} onSelect={handleSelect} />
                    ))
                )}
            </div>
        </div>
    )
}