import { useState } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import "./Authform.css"

export default function RegisterForm({ setNewUser }) {
    const { signUp } = useAuth();
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (formData.password !== formData.password2) {
                throw new Error("Passwords dont match")
            }
            await signUp(formData);

            nav("/");
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleClick = () => {
        setNewUser(false);
    };
    return (
        <div className="authContainer">
            <form className="authForm" onSubmit={handleSubmit}>
                <h2 className="authTitle">Register</h2>
                <label>
                    <input type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />{" "}
                </label>
                <label>
                    <input type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </label>
                <label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        minLength="6"
                    />{" "}
                </label>
                <label>
                    <input type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        minLength="6"
                    />
                </label>
                <input type="submit" value="Sign Up" />
                <div className="authToggle">
                    <p>Already have an account?</p>
                    <button onClick={handleClick}>Log In</button>
                </div>
            </form>
        </div>
    )
}

