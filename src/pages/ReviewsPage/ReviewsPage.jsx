import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard.jsx/ReviewCard";
import "./ReviewsPage.css"
import axios from "axios";

export default function ReviewPage() {
    const [review, setReview] = useState(null);

    useEffect(() => {
        const getReview = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/review/');
                const reviews = res.data;

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

        getReview();
    }, []);

    const loading = () => {
        return <h1>Loading...</h1>
    };

    const loaded = () => {
        return (
            <div className="reviewsPage">
                <h1 className="reviewPageTitle">Reviews</h1>
                <div className="reviewsContainer">
                    {review.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))};
                </div>
            </div>
        );
    };
    return review ? loaded() : loading();
}