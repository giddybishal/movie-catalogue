import Logo from "../components/Logo";
import LoginButton from "../components/LoginButton";
import { useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContext";
import MovieCard from "../components/MovieCard";

function Dashboard(){

    const { favourites } = useContext(FavouritesContext)

    return (
        <main className="text-white text-3xl font-extrabold bg-[#0f172a]  w-full min-h-screen pt-[100px]">
            <Logo />
            <LoginButton/>
                <div className="max-w-[90%] mx-auto mt-10 md:mt-15">
                <h2 className="bg-gradient-to-r from-rose-500 to-lime-300 bg-clip-text text-transparent
                ">Your Favourite Movies:</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left flex-wrap gap-6 mt-[40px]'>
                { favourites.map(movie=>(
                    <MovieCard key={movie.tmdb_id} movie={movie}/>
                ))}
                </div>
            </div>   
        </main>
    );
}

export default Dashboard
