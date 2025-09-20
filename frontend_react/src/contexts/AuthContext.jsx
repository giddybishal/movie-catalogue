import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
        const decoded = jwtDecode(token);
        setUserName(decoded.sub)
        // console.log(decoded)
        setIsLoggedIn(true)
        }
    }, []);

    return (
        <AuthContext.Provider value={{ username, setUserName, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
