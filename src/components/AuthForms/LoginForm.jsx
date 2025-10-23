import { useState } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { useUser } from "../../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css"

export default function LoginForm({ setNewUser }) {
    const { login } = useAuth();
    const nav = useNavigate();
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await login(formData);
            setUser({
                _id: res.data.user.id,
                username: res.data.user.username,
                email: res.data.user.email,
            });

            nav("/");
        } catch (err) {
            console.error(err.message);
        }
    }
    const handleClick = () => {
        setNewUser(true);
    };

    return (
        <div className="authContainer">
            <form className="authForm" onSubmit={handleSubmit}>
                <h2 className="authTitle">Login</h2>
                <label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </label>
                <label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        minLength="6"
                    />{" "}
                </label>
                <input type="submit" value="Log In" />
                <div className="authToggle">
                    <p>Don't have an account?</p>
                    <button onClick={handleClick}>Register</button>
                </div>
            </form>
        </div>
    )
}