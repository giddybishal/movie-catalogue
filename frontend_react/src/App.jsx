import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Main from './pages/Main'
import Dashboard from './pages/Dashboard'

import { FavouritesProvider } from "./contexts/FavouritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MoviesProvider } from "./contexts/MoviesContext";
import { LoginProvider } from "./contexts/LoginContext";
import { WatchLaterProvider } from "./contexts/WatchLaterContext";

function App(){
  
  return(
    <BrowserRouter>
      <AuthProvider>
      <LoginProvider>
        <FavouritesProvider>
          <WatchLaterProvider>
            <MoviesProvider>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </MoviesProvider>
          </WatchLaterProvider>
        </FavouritesProvider>
      </LoginProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App
