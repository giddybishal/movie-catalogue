import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { LoginContext } from "../contexts/LoginContext";

function LoginButton(){
    const { username, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const { setLogInUserName, setLogInPassword, setRegisterUserName, setEmail, setFirstName, setLastName, setRegisterPassword } = useContext(LoginContext)

    const navigate = useNavigate()
    const location  = useLocation()

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const clearForms = () => {
        setLogInUserName('')
        setLogInPassword('')
        setRegisterUserName('')
        setEmail('')
        setFirstName('')
        setLastName('')
        setRegisterPassword('')
    }

    const handleClick = () => {
        if (!isLoggedIn) {
        navigate("/login");
        } else {
        if (location.pathname === "/dashboard") {
            // Show the logout confirmation modal
            setShowLogoutModal(true);
        } else {
            navigate("/dashboard");
        }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setShowLogoutModal(false);
        clearForms();
        navigate("/");
    };

    const handleCancel = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
        <div className="absolute top-5 right-5 md:top-5 md:right-10 flex gap-2">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent
            ">{isLoggedIn? username: ''}</span><img src="/profile-pic.jpg" alt="profile-pic" className="cursor-pointer w-10 rounded-full ring-2 ring-yellow-300 ring-offset-1 ring-offset-black transition-all hover:ring-4 hover:ring-yellow-400" onClick={handleClick}/>
        </div>

        {/* JSX Modal */}
        {showLogoutModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg text-black w-80 text-center">
                <p className="mb-6">Are you sure you want to log out?</p>
                <div className="flex justify-around">
                <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                </div>
            </div>
            </div>
        )}
        </>
    );
}

export default LoginButton
