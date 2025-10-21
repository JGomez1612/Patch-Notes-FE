import { useEffect, useState } from "react";
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
                        `http://localhost:3000/api/game/${review.gameId}`
                    );
                    reviewsWithImages.push({
                        ...review,
                        gameImage: gameRes.data.background_image,
                        gameName: gameRes.data.name,
                    });
                }

                setReview(reviewsWithImages);
            } catch (err) {
                console.err(err.message);
            }
        };

        getReview();
    }, []);

    const loading = () => {
        return <h1>Loading...</h1>
    };

    const loaded = () => {
        return (
            <div>
                <h1>Reviews</h1>
                {review.map((review, i) => (
                    <div key={i} className='reviewCard'>
                        <h2>{review.title}</h2>
                        <img src={review.gameImage} alt={review.title} width="250px" />
                        <p>{review.userId.username} reviewed {review.gameName}</p>
                        <p>Rating: {review.rating}/10</p>
                        <p>Review: {review.body}</p>
                    </div>
                ))};
            </div>
        );
    };
    return review ? loaded() : loading();
}