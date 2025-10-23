import "./GameDetailsCard.css"

export default function GameDetailsCard({ details, user, showForm, onToggleForm }) {
    return (
        <div className="gameDetailsCard">
                <div className="detailsInfo">
                    <h1 className="detailsName">{details.name}</h1>
                    <h3>Developers: {details.developers.map((d) => d.name).join(", ")}</h3>
                    <h3>Publishers: {details.publishers.map((p) => p.name).join(", ")}</h3>
                    <div className="detailsImage">
                        <img src={details.background_image} alt={details.name} width="400" />
                    </div>
                    <p className="detailsDate">Released: {details.released}</p>
                    <p className="detailsRating">Rating: {details.rating}</p>
                    <p className="detailsPlaytime">Playtime: {details.playtime} hrs</p>
                    <p className="detailsGenre">Genres: {details.genres.map((g) => g.name).join(", ")}</p>
                    <p className="detailsDesc">{details.description_raw}</p>
                    
                {user && (
                    <button className="reviewButton" onClick={onToggleForm}>
                        {showForm ? "Cancel" : "Create Review"}
                    </button>
                )}
            </div>
        </div>
    )
}