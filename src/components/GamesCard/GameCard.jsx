import './GameCard.css'

export default function GameCard({ game, onSelect }){
    return (
        <div className="card" onClick={() => onSelect(game)}>
            <img 
                src={game.background_image}
                alt={game.name}
                width="250px"
            />
            <h3>{game.name}</h3>
        </div>
    )
}