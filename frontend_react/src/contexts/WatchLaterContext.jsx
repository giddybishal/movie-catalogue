import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WatchLaterContext = createContext();

export function WatchLaterProvider({ children }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [watchLater, setWatchLater] = useState([]);
  const { isLoggedIn } = useContext(AuthContext)

  async function getWatchLater() {
    try {
      const res = await fetch(`${BACKEND_URL}/watchLater/getWatchLater`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setWatchLater(data); 
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

  async function addWatchLater(movie) {
    try {
      const res = await fetch(`${BACKEND_URL}/watchLater/addWatchLater`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(movie),
      });

      if (res.status === 201) {
        await getWatchLater(); // Refresh state from backend
      } else {
        const errData = await res.json();
        console.error(errData.detail || "Failed to add favourite");
      }
    } catch (err) {
      console.error("Error adding favourite:", err);
    }
  }

  async function deleteWatchLater(movie){
    try{
      const res = await fetch(`${BACKEND_URL}/watchLater/deleteWatchLater/${movie.tmdb_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":   `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (res.status === 204){
        await getWatchLater()
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
    getWatchLater();
  } else {
    // Clear watch later when user logs out
    setWatchLater([]);
  }
  }, [isLoggedIn] );

  return (
    <WatchLaterContext.Provider value={{ watchLater, addWatchLater, deleteWatchLater }}>
      {children}
    </WatchLaterContext.Provider>
  );
}
