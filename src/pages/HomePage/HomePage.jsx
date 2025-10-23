import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { useUser } from "../../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import ReviewCard from "../../components/ReviewCard.jsx/ReviewCard";
import axios from "axios";

export default function HomePage() {
    const nav = useNavigate();
    const { cookies } = useAuth();
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [review, setReview] = useState(null);

    const loggedIn = cookies.token && user;

    useEffect(() => {
        async function getGames() {
            try {
                const apiKey = import.meta.env.VITE_RAWG_API_KEY;
                const res = await axios.get(
                    `https://api.rawg.io/api/games?key=${apiKey}&page_size=5`
                );
                setGames(res.data.results);
            } catch (err) {
                console.error("Error fetching games:", err);
            }
        }
        getGames();
    }, []);

    useEffect(() => {
        const getReview = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/review/');
                const reviews = res.data.slice(0, 2);

                const reviewsWithImages = [];

                for (const review of reviews) {
                    const gameRes = await axios.get(
                        `http://localhost:3000/api/games/${review.gameId}`
                    );
                    reviewsWithImages.push({
                        ...review,
                        gameImage: gameRes.data.background_image,
                        gameName: gameRes.data.name,
                    });
                }

                setReview(reviewsWithImages);
            } catch (err) {
                console.error(err.message);
            }
        };

        if (loggedIn) getReview();
    }, [loggedIn]);

    return (
        <div>
            {!loggedIn ? (
                <div>
                    <h1>Welcome to Patch Notes!</h1>
                    <p>Track, review, and share your favorite games!</p>
                    <button onClick={() => nav("/auth")}>Log In / Register</button>
                </div>
            ) : (
                <div>
                    <h1>Welcome back, {user.username}!</h1>
                </div>
            )}

            <h2>Featured Games</h2>
            <div className="homeGames">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {loggedIn && review && (
                <>
                    <h2>Recent Reviews</h2>
                    <div className="homeReviews">
                        {review.map((review, i) => (
                            <ReviewCard key={i} review={review} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}