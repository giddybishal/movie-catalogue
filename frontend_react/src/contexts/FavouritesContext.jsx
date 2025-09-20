import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);
  const { isLoggedIn } = useContext(AuthContext)

  async function getFavourites() {
    try {
      const res = await fetch("https://your-backend-url.onrender.com/movies/getMovies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setFavourites(data); 
        console.log(data)
      } else {
        const errData = await res.json();
        alert(errData.detail || "Failed to fetch favourites");
      }
    } catch (err) {
      console.error("Error fetching favourites:", err);
      alert("Error connecting to backend");
    }
  }

  async function addFavourite(movie) {
    try {
      const res = await fetch("https://your-backend-url.onrender.com/movies/addMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(movie),
      });

      if (res.status === 201) {
        // Add it to local state as well
        setFavourites((prev) => [...prev, movie]);
        alert(`${movie.title} added to favourites!`);
      } else {
        const errData = await res.json();
        alert(errData.detail || "Failed to add favourite");
      }
    } catch (err) {
      console.error("Error adding favourite:", err);
      alert("Error connecting to backend");
    }
  }

  async function deleteFavourite(movie){
    try{
      const res = await fetch(`https://your-backend-url.onrender.com/movies/delete/${movie.tmdb_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":   `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (res.status === 204){
        setFavourites(prev => prev.filter(fav => fav.tmdb_id !== movie.tmdb_id))
        alert(`${movie.title} removed from Favourite.`)
      } else {
        const errData = await res.json()
        alert(errData.detail || 'Failed to remove Favourite.')
      }
    } catch(err){
        console.error("Error removing favourite:", err);
        alert("Error connecting to backend");
    }
  }

  useEffect(() => {
    if( isLoggedIn ) getFavourites();
  }, [isLoggedIn] );

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, deleteFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
