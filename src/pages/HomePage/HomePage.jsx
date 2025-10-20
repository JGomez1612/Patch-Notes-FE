import { useAuth } from "../../context/authContext/authContext";
import { useUser } from "../../context/userContext/userContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const nav = useNavigate();
    const { cookies } = useAuth();
    const { user } = useUser();

    const loggedIn = cookies.token && user;
    console.log("token:", cookies.token);
    console.log("user:", user);

    return (
        <>
            <div>
                {!loggedIn ? (
                    <div>
                        <h1>Welcome to Patch Notes!</h1>
                        <p>Track, review, and share your favorite games!</p>
                        <button onClick={() => nav("/auth")}>Log In</button>
                        <button onClick={() => nav("/auth")}>Sign Up</button>
                    </div>
                    ) : (
                    <div>
                        <h1>Welcome back, {user.username}!</h1>
                    </div>
                )}
            </div>
        </>
    )
}