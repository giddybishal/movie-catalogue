import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Main from './pages/Main'
import Dashboard from './pages/Dashboard'
import WatchMovie from "./pages/WatchMovie";

import { FavouritesProvider } from "./contexts/FavouritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MoviesProvider } from "./contexts/MoviesContext";
import { LoginProvider } from "./contexts/LoginContext";
import { WatchLaterProvider } from "./contexts/WatchLaterContext";
import { AI_ChatbotProvider } from "./contexts/AI_ChatbotContext";

function App(){
  
  return(
    <BrowserRouter>
      <AuthProvider>
      <LoginProvider>
        <FavouritesProvider>
          <WatchLaterProvider>
            <MoviesProvider>
              <AI_ChatbotProvider>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/watchMovie/:tmdb_id" element={<WatchMovie />} />
              </Routes>
              </AI_ChatbotProvider>
            </MoviesProvider>
          </WatchLaterProvider>
        </FavouritesProvider>
      </LoginProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App
