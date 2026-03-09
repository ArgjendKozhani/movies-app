import { useState, useEffect } from "react";
import Movies from "./Movies.jsx";
import Navbar from "./Navbar.jsx";
import Favourites from "./Favourites.jsx";
import './App.css';

function App() {
  const [page, setPage] = useState("movies");
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem("mnet_favourites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("mnet_favourites", JSON.stringify(favourites));
  }, [favourites]);

  function toggleFavourite(movie) {
    setFavourites(prev =>
      prev.some(m => m.id === movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    );
  }

  return (
    <>
      <Navbar page={page} onNavigate={setPage} favouriteCount={favourites.length} />
      {page === "movies" ? (
        <Movies favourites={favourites} onToggleFavourite={toggleFavourite} />
      ) : (
        <Favourites favourites={favourites} onToggleFavourite={toggleFavourite} />
      )}
    </>
  );
}

export default App;
