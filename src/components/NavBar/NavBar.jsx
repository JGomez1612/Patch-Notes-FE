import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar(){
    return (
        <nav className="nav">
            <Link to={'/'} className="link">
                <h2>Home</h2>
            </Link>
            <Link to={'/games'} className="link">
                <h2>Games</h2>
            </Link>
            <Link to={'/reviews'} className="link">
                <h2>Reviews</h2>
            </Link>
        </nav>
    )
}