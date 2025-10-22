import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext/userContext";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [editData, setEditData] = useState({});
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

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/review/${id}`);
            setProfile({
                ...profile,
                reviews: profile.reviews.filter((r) => r._id !== id),
            });
        } catch (err) {
            console.error(err.message)
        }
    }

    function handleEdit(review) {
        setEditingReview(review._id);
        setEditData({
            title: review.title,
            body: review.body,
            rating: review.rating,
        });
    }

    async function saveEdit(id) {
        try {
            const res = await axios.put(`http://localhost:3000/api/review/${id}`, editData);
            setProfile({
                ...profile,
                reviews: profile.reviews.map((r) =>
                    r._id === id ? { ...res.data, gameImage: r.gameImage } : r
                )
            });
            setEditingReview(null);
        } catch (err) {
            console.error(err.message);
        }
    }

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
                        {editingReview === review._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                />
                                <textarea
                                    value={editData.body}
                                    onChange={(e) => setEditData({ ...editData, body: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editData.rating}
                                    onChange={(e) => setEditData({ ...editData, rating: e.target.value })}
                                />
                                <button onClick={() => saveEdit(review._id)}>Save</button>
                                <button onClick={() => setEditingReview(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <img src={review.gameImage} alt={review.title} width="250px" />
                                {review.title} - {review.rating}/10
                                <p>{review.body}</p>
                                <button onClick={() => handleEdit(review)}>Edit</button>
                                <button onClick={() => handleDelete(review._id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

