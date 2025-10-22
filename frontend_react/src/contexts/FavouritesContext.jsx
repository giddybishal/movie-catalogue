import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [favourites, setFavourites] = useState([]);
  const { isLoggedIn } = useContext(AuthContext)

  async function getFavourites() {
    try {
      const res = await fetch(`${BACKEND_URL}/favouriteMovies/getFavouriteMovies`, {
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
      const res = await fetch(`${BACKEND_URL}/favouriteMovies/addFavouriteMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(movie),
      });

      if (res.status === 201) {
        await getFavourites(); // Refresh state from backend
      } else {
        const errData = await res.json();
        console.error(errData.detail || "Failed to add favourite");
      }
    } catch (err) {
      console.error("Error adding favourite:", err);
    }
  }

  async function deleteFavourite(movie){
    try{
      const res = await fetch(`${BACKEND_URL}/favouriteMovies/deleteFavouriteMovie/${movie.tmdb_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":   `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (res.status === 204){
        await getFavourites()
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
    if (isLoggedIn) {
    getFavourites();
  } else {
    // Clear favourites when user logs out
    setFavourites([]);
  }
  }, [isLoggedIn] );

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, deleteFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
