import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext/userContext";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;

        async function fetchProfile() {
            try {
                const res = await axios.post("http://localhost:3000/api/user/profile", {
                    userId: user._id,
                });

                let reviewsWithImages = [];

                for (const review of res.data.reviews) {
                    const gameRes = await axios.get(
                        `http://localhost:3000/api/games/${review.gameId}`
                    );
                    reviewsWithImages.push({
                        ...review,
                        gameImage: gameRes.data.background_image,
                    });
                }

                setProfile({
                    user: res.data.user,
                    reviews: reviewsWithImages,
                });
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchProfile();
    }, [user]);

    if (!profile) return <p>No profile data.</p>;

    return (
        <div>
            <h2>{profile.user.username}'s Profile</h2>

            <h3>Recent Reviews</h3>
            {profile.reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                profile.reviews.map((review) => (
                    <div key={review._id}>
                        <img src={review.gameImage} alt={review.title} width="250px"/>
                        {review.title} - {review.rating}/10
                        <p>{review.body}</p>
                    </div>
                ))
            )}
        </div>
    );
}

