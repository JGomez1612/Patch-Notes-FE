import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GamesPage({searchTerm, setSearchTerm, setSelectedGame}) {
    const [games, setGames] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        async function getGames() {
            try {
                const apiKey = import.meta.env.VITE_RAWG_API_KEY;
                const res = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);

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
            const res = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`);

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
        <div>
            <h1>Games Gallery</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search Games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {games.length === 0 ? (
                <p>No games found.</p>
            ) : (
                games.map((g) => (
                    <div key={g.id} onClick={() => handleSelect(g)}>
                        <img src={g.background_image} alt={g.name} />
                        <h2>{g.name}</h2>
                    </div>
                ))
            )}
        </div>
    )
}