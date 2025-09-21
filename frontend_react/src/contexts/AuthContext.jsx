import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState('');

    const logoutUser = ()=>{
        localStorage.removeItem('token')
        setUserName('')
        setIsLoggedIn(false)
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
        try{
            const decoded = jwtDecode(token)

            // Check expiry
            const now = Date.now() / 1000; // in seconds
            if (decoded.exp && decoded.exp < now){
                // Token expired -> logout
                logoutUser();
            }else{
                // Valid token
                setUserName(decoded.sub)
                setIsLoggedIn(true)
            }
        }catch(err){
            console.error('Invalid token:', err)
            logoutUser()
        }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ username, setUserName, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
