import { useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContext";

function MovieCard({movie}){
    const {id, title, rating, poster_path, release_date, original_language, popularity} = movie

    const { favourites, addFavourite, deleteFavourite } = useContext(FavouritesContext)

    function hasSameMovie(favourites, movie){
        for(let i = 0; i<favourites.length; i++){
            if (favourites[i].tmdb_id === movie.tmdb_id){
                return true
            }
        }
        return false
    }

    function handleFavourite(){
        if (hasSameMovie(favourites, movie)){
            deleteFavourite(movie)
        } else{
            addFavourite(movie)
        }
    }

    return(
        <div className='bg-[#0d1117] rounded-lg p-2'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'} alt={title} className="rounded-lg overflow-hidden"/>

            <div className="text-white text-lg font-normal">
                <h3 className="mt-2">{title}</h3>

                <div className="mt-5 text-sm font-normal">
                    <div className="flex gap-2 items-center">
                        <img src="/star.svg" alt="Star Icon"/>
                        <p>{rating? rating.toFixed(1): 'N/A'}</p>
                        <span>•</span>
                        <p>{original_language}</p>
                        <span>•</span>
                        <p>{release_date? release_date.split('-')[0]: 'N/A'}</p>
                        <p className="text-3xl ml-auto cursor-pointer" onClick={()=>handleFavourite()}>{hasSameMovie(favourites, movie) ? '❤️' : '🤍'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard
