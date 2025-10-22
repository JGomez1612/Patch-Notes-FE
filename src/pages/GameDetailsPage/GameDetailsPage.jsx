import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext/userContext";
import axios from "axios";

export default function GameDetailsPage({ selectedGame }) {
    const { user } = useUser();
    const [details, setDetails] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [reviewData, setReviewData] = useState({ title: "", body: "", rating: 0 });

    useEffect(() => {
        if (!selectedGame) return;

        async function fetchDetails() {
            try {
                const apiKey = import.meta.env.VITE_RAWG_API_KEY;
                const res = await axios.get(`https://api.rawg.io/api/games/${selectedGame.id}?key=${apiKey}`);
                setDetails(res.data);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchDetails();
    }, [selectedGame]);

    const handleChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };

    const submitReview = async () => {
        try {
            await axios.post("http://localhost:3000/api/review", {
                ...reviewData,
                userId: user._id,
                gameId: selectedGame.id,
            });
            alert("Review submitted!");
            setShowForm(false);
            setReviewData({ title: "", body: "", rating: 0 });
        } catch (err) {
            console.error(err.message);
        }
    };

    if (!selectedGame) return <p>No game selected. Go back to the Games page.</p>;
    if (!details) return <p>Loading game details...</p>;

    return (
        <div>
            <h1>{details.name}</h1>
            <h3>Developers: {details.developers.map((d) => d.name).join(", ")}</h3>
            <h3>Publishers: {details.publishers.map((p) => p.name).join(", ")}</h3>
            <img src={details.background_image} alt={details.name} width="400" />
            <p>Released: {details.released}</p>
            <p>Rating: {details.rating}</p>
            <p>Playtime: {details.playtime} hrs</p>
            <p>Genres: {details.genres.map((g) => g.name).join(", ")}</p>
            <p>Description: {details.description_raw}</p>

            {user && (
                <>
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Cancel" : "Create Review"}
                    </button>

                    {showForm && (
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={reviewData.title}
                                onChange={handleChange}
                            />
                            <textarea
                                name="body"
                                placeholder="Write your review..."
                                value={reviewData.body}
                                onChange={handleChange}
                                rows={5}
                            />
                            <input
                                type="number"
                                name="rating"
                                placeholder="Rating (0-10)"
                                value={reviewData.rating}
                                onChange={handleChange}
                                min={0}
                                max={10}
                            />
                            <button onClick={submitReview}>Submit Review</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
