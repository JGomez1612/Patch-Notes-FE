import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewPage(){
    const [review, setReview] = useState(null);

    useEffect(() => {
        const getReview = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/review/');

                setReview(res.data);
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
                {review.map((r, i) => (
                    <div key={i} className='reviewCard'>
                        <h2>{r.title}</h2>
                        <p>User: {r.userId.username}</p>
                        <p>Game: {r.gameId}</p>
                        <p>Review: {r.body}</p>
                        <p>Rating: {r.rating}</p>
                    </div>
                ))};
            </div>
        );
    };
    return review ? loaded() : loading();
}