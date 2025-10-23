import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext/authContext';
import { useUser } from '../../context/userContext/userContext';

export default function NavBar() {
    const { logout } = useAuth();
    const { user, setUser } = useUser();
    const nav = useNavigate();

    function handleLogout() {
        logout();
        setUser(null);
        nav('/');
    }

    return (
        <nav className="nav">
            <div className='navLeft'>
            <Link to={'/'} className="link">
                <h2>Home</h2>
            </Link>
            <Link to={'/games'} className="link">
                <h2>Games</h2>
            </Link>
            <Link to={'/reviews'} className="link">
                <h2>Reviews</h2>
            </Link>
            </div>
            {user && (
                <div className='navRight'>
                    <Link to={'/user'} className="link">
                        <h2>User</h2>
                    </Link>
                    <button className="navButton" onClick={handleLogout}>Logout</button>
                </div>
            )}


        </nav>
    )
}