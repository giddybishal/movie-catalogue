import { useNavigate } from "react-router-dom";

function Logo(){
    const navigate = useNavigate()

    return (
        <img className='absolute top-5 left-5 md:top-5 md:left-10 cursor-pointer w-15 md:w-20 rounded-full shadow-[0_0_10px_#facc15] transition-shadow hover:shadow-[0_0_15px_#fcd34d]' src="/logo2.jpg" alt="logo" onClick={()=>navigate('/')}/>
    );
}

export default Logo
