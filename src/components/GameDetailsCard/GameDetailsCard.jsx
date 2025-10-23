import "./GameDetailsCard.css"

export default function GameDetailsCard({ details }) {
    return (
        <div className="gameDetailsCard">
            <div className="detailsInfo">
                <h1>{details.name}</h1>
                <h3>Developers: {details.developers.map((d) => d.name).join(", ")}</h3>
                <h3>Publishers: {details.publishers.map((p) => p.name).join(", ")}</h3>
                <img src={details.background_image} alt={details.name} width="400" />
                <p>Released: {details.released}</p>
                <p>Rating: {details.rating}</p>
                <p>Playtime: {details.playtime} hrs</p>
                <p>Genres: {details.genres.map((g) => g.name).join(", ")}</p>
                <p>Description: {details.description_raw}</p>
            </div>
        </div>
    )
}