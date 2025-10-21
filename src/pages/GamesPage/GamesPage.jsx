import { useState, useEffect } from "react";
import axios from "axios";

export default function GamesPage() {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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
                    <div key={g.id}>
                        <img src={g.background_image} alt={g.name} />
                        <h2>{g.name}</h2>
                    </div>
                ))
            )}
        </div>
    )
}