import Logo from "../components/Logo";
import LoginButton from "../components/LoginButton";
import { useContext, useState, useReducer } from "react";
import { FavouritesContext } from "../contexts/FavouritesContext";
import MovieCard from "../components/MovieCard";
import { WatchLaterContext } from "../contexts/WatchLaterContext";
import { AuthContext } from "../contexts/AuthContext";

// Reducer function
function tabReducer(state, action) {
  switch (action.type) {
    case "SHOW_FAVOURITES":
      return { activeTab: "favourites" };
    case "SHOW_WATCH_LATER":
      return { activeTab: "watchLater" };
    default:
      return state;
  }
}

function Dashboard(){
    const { favourites } = useContext(FavouritesContext)
    const { watchLater } = useContext(WatchLaterContext)
    const { username } = useContext(AuthContext)

    const [state, dispatch] = useReducer(tabReducer, { activeTab: "favourites" });

    return (
        <main className="text-white text-3xl font-extrabold bg-[#0f172a]  w-full min-h-screen pt-[100px]">
            <Logo />
            <LoginButton/>
            <div className="max-w-[90%] mx-auto mt-5 md:mt-10">
                <h2 className="mb-10 bg-gradient-to-r from-rose-500 to-lime-300 bg-clip-text text-transparent
                ">Welcome to your Movies Catalogue, {username}</h2>
                <div className="text-sm font-bold flex gap-5">

                    <p onClick={()=> dispatch({type:'SHOW_FAVOURITES'})} className={`${state.activeTab === 'favourites' ?'bg-white text-black': 'bg-black text-white'} rounded-md px-3 py-2 cursor-pointer`}>Favourites</p>

                    <p onClick={()=> dispatch({type:'SHOW_WATCH_LATER'})}className={`${state.activeTab === 'watchLater' ?'bg-white text-black': 'bg-black text-white'} rounded-md px-3 py-2 cursor-pointer`}>Watch Later</p>

                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left flex-wrap gap-6 mt-[20px]'>
                { state.activeTab === 'favourites' && favourites.map(movie=>(
                    <MovieCard key={movie.tmdb_id} movie={movie}/>
                ))}
                { state.activeTab === 'watchLater' && watchLater.map(movie=>(
                    <MovieCard key={movie.tmdb_id} movie={movie}/>
                ))}
                </div>
            </div>   
        </main>
    );
}

export default Dashboard
