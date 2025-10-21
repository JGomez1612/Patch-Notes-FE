import { useState, useEffect } from "react";
import axios from "axios";

export default function GameDetailsPage({ selectedGame }) {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (!selectedGame) return;

        async function fetchDetails() {
            try {
                const apiKey = import.meta.env.VITE_RAWG_API_KEY;
                const res = await axios.get(`https://api.rawg.io/api/games/${selectedGame.id}?key=${apiKey}`);

                setDetails(res.data);
            } catch (err) {
                console.error(err.message)
            }
        }

        fetchDetails();
    }, [selectedGame])

    if (!selectedGame) return <p>No game selected. Go back to the Games page.</p>;
    if (!details) return <p>Loading game details...</p>;

    return (
        <div>
            <h1>{details.name}</h1>
            <h3>Developers: {details.developers?.map((d) => d.name).join(", ")}</h3>
            <h3>Publishers: {details.publishers?.map((p) => p.name).join(", ")}</h3>
            <img src={details.background_image} alt={details.name} width="400" />
            <p>Released: {details.released}</p>
            <p>Rating: {details.rating}</p>
            <p>Playtime: {details.playtime} hrs</p>
            <p>Genres: {details.genres?.map((g) => g.name).join(", ")}</p>

            <p>Description: {details.description_raw}</p>
        </div>
    )
}
