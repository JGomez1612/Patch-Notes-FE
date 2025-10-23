import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext/userContext";
import axios from "axios";
import GameDetailsCard from "../../components/GameDetailsCard/GameDetailsCard";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import "./GameDetailsPage.css";

export default function GameDetailsPage({ selectedGame }) {
  const { user } = useUser();
  const [details, setDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleSubmitReview = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/review", {
        ...data,
        userId: user._id,
        gameId: selectedGame.id,
      });
      alert("Review submitted!");
      setShowForm(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!selectedGame) return <p>No game selected. Go back to the Games page.</p>;
  if (!details) return <p>Loading game details...</p>;

    return (
        <div className="gameDetailsContainer">
            <div className="detailsAndForm">
                <GameDetailsCard
                    details={details}
                    user={user}
                    showForm={showForm}
                    onToggleForm={() => setShowForm(!showForm)}
                />

                {showForm && (
                    <div className="formContainer">
                        <ReviewForm onSubmit={handleSubmitReview} />
                    </div>
                )}
            </div>
        </div>
    );
}