import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext()

export function LoginProvider({children}){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const { setUserName, setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    // For login:
    const [logInUsername, setLogInUserName] = useState('')
    const [logInPassword, setLogInPassword] = useState('')

    // For register:
    const [registerUsername, setRegisterUserName] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    // To Login:
    async function handleLogin(username, password){
        try{
            // const res = await fetch("http://127.0.0.1:8000/auth/token", {
            const res = await fetch(`${BACKEND_URL}/auth/token`, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({
                    username: username,
                    password: password
                }),
            });
            if (!res.ok){
                alert('Login failed');
                return;
            }
            const data = await res.json();
            localStorage.setItem('token', data.access_token)
            setIsLoggedIn(true)
            setUserName(username)
            navigate('/dashboard')
        }catch(err){
            console.error(err)
            alert('Error connecting to backend')
        }
    };

    // To register:
    async function handleRegister() {
        try {
            // Prepare payload matching the CreateUserRequest
            const payload = {
            username: registerUsername,
            email,
            first_name: firstName,
            last_name: lastName,
            password: registerPassword,
            role: "user"  // always create as regular user
            };

            // const res = await fetch("http://127.0.0.1:8000/auth/login", {
            const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            });

            if (res.status === 201) {
            // Registration successful
            alert(`User ${registerUsername} registered successfully!`);
            
            await handleLogin(registerUsername, registerPassword)
            } else if(res.status === 422){
                const errData = await res.json()
                alert(errData.detail[0].msg || 'Registration failed')
            } 
            else {
            // Backend returned an error
            const errData = await res.json();
            alert(errData.detail || "Registration failed");
            }

        } catch (err) {
            console.error("Registration error:", err);
            alert("Error connecting to backend");
        }
    }

    return (
        <LoginContext.Provider value={{ logInUsername, setLogInUserName, logInPassword, setLogInPassword, registerUsername, setRegisterUserName, email, setEmail, firstName, setFirstName, lastName, setLastName, registerPassword, setRegisterPassword, handleLogin, handleRegister}}>
            {children}
        </LoginContext.Provider>
    )
}
