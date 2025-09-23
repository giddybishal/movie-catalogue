import { useContext } from 'react'
import Search from '../components/Search'
import Spinner from '../components/Spinner'
import MovieCard from '../components/MovieCard'
import LoginButton from '../components/LoginButton'
import Logo from '../components/Logo'
import { MoviesContext } from '../contexts/MoviesContext'

function Main(){
  const { searchTerm, setSearchTerm, errorMessage, movieList, isLoading} = useContext(MoviesContext)

  return(
    <main>
      <div className='bg-[#0f172a] text-white text-3xl font-extrabold text-center'>

        <header className="h-screen w-full bg-cover bg-center flex flex-col justify-around items-center relative" style={{ backgroundImage: "url('/stary-bg.jpg')"}}> 

          <Logo />
          <LoginButton />
        
          <img src='scream-bg.png' alt='Hero Banner' className='w-150'/> 
        
          <div className='md:max-w-1/4 flex justify-center gap-2 font-bold'>
            <p className='bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent'>Find</p> 
            <p className='bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent'>,</p>
            <p className=' bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent'>Watch</p>
            <p className='bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent'>&</p> 
            <p className='bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent

            '>Catalogue</p>
          </div>
        
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> 
         
         </header>

        <section className='all-movies max-w-[90%] mx-auto text-left text-lg font-normal'>
          
          <h2 className='mt-[40px] text-3xl font-extrabold'><span className='bg-gradient-to-r from-lime-400 via-yellow-400 to-emerald-500 bg-clip-text text-transparent'>Top Trending Movies:</span></h2>
          
          {isLoading ? (
            <Spinner />
          ): errorMessage? (
            <p className='text-red-500'>{errorMessage}</p>
          ): (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left flex-wrap gap-6 mt-[40px]'>
              {movieList.map(movie => (
                <MovieCard key={movie.tmdb_id} movie={movie}/>
              ))}
            </div>
          )
          }

        </section>

      </div>
    </main>
    
  )
}

export default Main
