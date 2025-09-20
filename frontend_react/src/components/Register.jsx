import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

function Register(){
    const {registerUsername, setRegisterUserName, email, setEmail, firstName, setFirstName, lastName, setLastName, registerPassword, setRegisterPassword, handleRegister} = useContext(LoginContext)

    return (
        <>
            <div className="flex gap-10 mt-10 border-1 border-white p-3">
                <input type="text" placeholder="Username" className="focus:outline-none focus:ring-0"
                value={registerUsername}
                onChange={e => setRegisterUserName(e.target.value)}
                />
            </div>

            <div className="flex gap-10 mt-10 border-1 border-white p-3">
                <input type="text" placeholder="Email" className="focus:outline-none focus:ring-0"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="flex gap-10 mt-10 border-1 border-white p-3">
                <input type="text" placeholder="First Name" className="focus:outline-none focus:ring-0"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                />
            </div>

            <div className="flex gap-10 mt-10 border-1 border-white p-3">
                <input type="text" placeholder="Last Name" className="focus:outline-none focus:ring-0"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                />
            </div>

            <div className="flex gap-10 mt-10 border-1 border-white p-3">
                <input type="text" placeholder="Password" className="focus:outline-none focus:ring-0"
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                />
            </div>

            <div onClick={() => handleRegister()}
                className="mt-10 border-1 border-white bg-blue-900 text-white font-extrabold text-center p-3 cursor-pointer">
                    Register
                </div>
        </>
    );
}

export default Register
