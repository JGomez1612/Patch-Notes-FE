import { useState } from "react";
import "./ReviewForm.css";

export default function ReviewForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ title: "", body: "", rating: 0 });
  };

  return (
    <div className="reviewForm">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="body"
        placeholder="Write your review..."
        value={formData.body}
        onChange={handleChange}
        rows={5}
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating (0-10)"
        value={formData.rating}
        onChange={handleChange}
        min={0}
        max={10}
      />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
}
