import "./ReviewCard.css"

export default function ReviewCard({ review }) {
    return (
        <div className='reviewCard'>
            <img src={review.gameImage} alt={review.title} width="250px" />
            <div className="reviewContent">
                <h2 className="reviewTitle">{review.title}</h2>
                <p className="reviewUser">
                    <span className="userName">{review.userId.username}</span> reviewed <span className="gameName">{review.gameName}</span></p>
                <p className="reviewRating">Rating: {review.rating}/10</p>
                <p className="reviewBody">{review.body}</p>
            </div>
        </div>
    )
}