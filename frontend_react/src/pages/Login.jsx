import { useContext, useState } from 'react';
import Register from '../components/Register';
import Logo from '../components/Logo';
import { LoginContext } from '../contexts/LoginContext';

function Login(){
    const { logInUsername, setLogInUserName, logInPassword, setLogInPassword, handleLogin} = useContext(LoginContext)

    const [registerMode, setRegisterMode] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a0f1c] flex justify-center items-center w-full h-screen">
            <Logo />
            <div className={!registerMode ? 'bg-[#0f172a] w-[60%] h-[50%] md:w-[40%] text-white font-bold rounded-2xl p-10': 'bg-[#0f172a] w-[60%] h-[85%] md:w-[40%] text-white font-bold rounded-2xl p-10'}>

                <div className='flex justify-around'>
                    <button className='bg-green-50 rounded-md text-black px-5 py-2 cursor-pointer' onClick={()=>setRegisterMode(false)}>{registerMode ? '👉': '👇'} Log-In</button>
                    <button className='bg-yellow-50 rounded-md text-black px-5 py-2 cursor-pointer' onClick={()=>setRegisterMode(true)}>{registerMode ? '👇': '👉'} Register</button>
                </div>

                {!registerMode ? 
                (<>
                <div className="flex gap-10 mt-10 border-1 border-white p-3">
                    <img src="/login-username.png"/>
                    <input type="text" placeholder="Username" className="focus:outline-none focus:ring-0"
                    value={logInUsername}
                    onChange={e => setLogInUserName(e.target.value)}
                    />
                </div>

                <div className="flex gap-10 mt-10 border-1 border-white p-3">
                    <img src="/login-password.png"/>
                    <input type="text" placeholder="Password" className="focus:outline-none focus:ring-0"
                    value={logInPassword}
                    onChange={e => setLogInPassword(e.target.value)}
                    />
                </div>

                <div onClick={() => handleLogin(logInUsername, logInPassword)}
                className="mt-10 border-1 border-white bg-blue-900 text-white font-extrabold text-center p-3 cursor-pointer">
                    Login
                </div>
                </>) :
                <Register />
}
            </div>
        </div>
    );
}

export default Login
