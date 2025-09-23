import { useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { AuthContext } from "../contexts/AuthContext";
import { WatchLaterContext } from "../contexts/WatchLaterContext";

function MovieCard({ movie }) {
    const { tmdb_id, title, rating, poster_path, release_date, original_language, popularity } = movie

    const { favourites, addFavourite, deleteFavourite } = useContext(FavouritesContext)
    const { watchLater, addWatchLater, deleteWatchLater } = useContext(WatchLaterContext)

    const isFavourite = favourites.some(fav => fav.tmdb_id === movie.tmdb_id);

    function handleFavourite() {
        if (isFavourite) deleteFavourite(movie);
        else addFavourite(movie);
    }

    const inWatchLater = watchLater.some(mov => mov.tmdb_id === movie.tmdb_id);

    function handleWatchLater() {
        if (inWatchLater) deleteWatchLater(movie);
        else addWatchLater(movie);
        setMovieOptionId(null)
    }

    const { movieOptionId, setMovieOptionId } = useContext(AuthContext)

    return (
        <div className='bg-[#0d1117] rounded-lg p-2 relative'>
            <div className="relative">
                <img
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                    alt={title}
                    className="rounded-lg overflow-hidden"
                />

                <div
                    className="absolute top-2 right-2 group cursor-pointer"
                    onClick={handleFavourite}
                >
                    <p className="text-3xl">
                        {isFavourite ? '❤️' : '🤍'}
                    </p>
                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 text-sm font-bold text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {isFavourite ? 'Unfavourite' : 'Favourite'}
                    </span>
                </div>
            </div>

            <div className="text-white text-lg font-normal mt-2">
                <h3 className="">{title}</h3>
                <div className="mt-2 text-sm font-normal flex gap-2 items-center">
                    <img src="/star.svg" alt="Star Icon" />
                    <p>{rating ? rating.toFixed(1) : 'N/A'}</p>
                    <span>•</span>
                    <p>{original_language}</p>
                    <span>•</span>
                    <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>

                    <div className="ml-auto mr-3 relative group">
                        <button className="text-white text-xl font-extrabold cursor-pointer p-2" onClick={()=>setMovieOptionId(movieOptionId === tmdb_id ? null: tmdb_id)}>⋮</button>
                        { movieOptionId === tmdb_id &&
                        <div className="absolute text-center right-1 -top-10 p-2 text-[12px] w-[120px] bg-[#6F00FF] z-50 rounded-md cursor-pointer" >
                            <p onClick={() =>  handleWatchLater()}>{inWatchLater? 'Remove from watch later': 'Save to Watch later'}</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard
