import { useState, useEffect, createContext } from "react";
import { useDebounce } from "react-use";

export const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjg4OTlhMjE5NWJmNmM4ZTgyMjlhMDM2YWFmOTYzMCIsIm5iZiI6MTczMjAyMTc4MC4wNzAwMDAyLCJzdWIiOiI2NzNjOGUxNDM1NTU0MTc5MTNiMTRmMzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.'

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  async function fetchMovies(query = "") {
    setIsLoading(true);
    setErrorMessage("");

    try {
        console.log(API_KEY)
        const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch Movies");
      }
      const data = await response.json();
      if (!data.results) {
        setErrorMessage("Failed to fetch movies");
        setMovieList([]);
        return;
      }
      const normalizedMovies = data.results.map((movie) => ({
        tmdb_id: movie.id,
        rating: movie.vote_average,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        original_language: movie.original_language,
        popularity: movie.popularity,
      }));
      setMovieList(normalizedMovies || []);
      console.log(normalizedMovies);
    } catch (e) {
      console.error(`Error fetching movies: ${e}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <MoviesContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        errorMessage,
        setErrorMessage,
        movieList,
        setMovieList,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
