import { useCookies } from "react-cookie";
import { createContext, useMemo, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [cookies, setCookies, removeCookie] = useCookies();

    const connStr = "http://localhost:3000/api";

    async function signUp(formData) {
        const res = await axios.post(`${connStr}/user`, formData);

        setCookies("token", res.data.token);
        return res;
    }

    async function login(formData) {
        const res = await axios.post(`${connStr}/auth`, formData);

        setCookies("token", res.data.token);
        return res;
    }

    function logout() {
        ["token"].forEach((token) => removeCookie(token));
    }

    const value = useMemo(
        () => ({
            cookies,
            login,
            signUp,
            logout,
        }),
        [cookies]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}