import { useParams } from "react-router-dom"

function WatchMovie(){
    const { tmdb_id } = useParams()
    console.log(tmdb_id)
    return (
        <div className="w-screen h-screen">
            <iframe src={`https://www.vidking.net/embed/movie/${tmdb_id}`} width="100%" height="100%" frameborder="0" allowfullscreen allow="fullscreen"> </iframe>
        </div>
    )
}

export default WatchMovie
