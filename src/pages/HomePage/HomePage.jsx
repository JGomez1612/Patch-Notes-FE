import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { useUser } from "../../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import ReviewCard from "../../components/ReviewCard.jsx/ReviewCard";
import "./HomePage.css"
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
                const reviews = res.data.slice(0, 4);

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
                <div className="homeHeader">
                    <h1 className="homeTitle">Patch Notes</h1>
                    <h3 className="homeSubTitle">Track, review, and share your favorite games!</h3>
                    <p className="homeDesc">Patch Notes is your hub for tracking, reviewing, and sharing your favorite games. Discover new titles, read community reviews, and keep your gaming experiences organized—all in one place.</p>
                    <button className="ctaButton" onClick={() => nav("/auth")}>Log In / Register</button>
                </div>
            ) : (
                <div className="homeHeader">
                    <h1>Welcome back, {user.username}!</h1>
                </div>
            )}

            <h2 className="homeHeader">Featured Games</h2>
            <div className="homeGames">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {loggedIn && review && (
                <>
                    <h2 className="homeHeader">Recent Reviews</h2>
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