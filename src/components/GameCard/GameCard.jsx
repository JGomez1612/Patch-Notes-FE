import './GameCard.css'

export default function GameCard({ game, onSelect }){
    return (
        <div className="gameCard" onClick={() => onSelect(game)}>
            <img 
                src={game.background_image}
                alt={game.name}
            />
            <h3>{game.name}</h3>
        </div>
    )
}