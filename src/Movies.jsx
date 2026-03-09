
import { useState, useEffect } from "react";
import "./Movies.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER = "https://placehold.co/500x750/1a1a2e/666666?text=No+Poster";

function Movies({ favourites = [], onToggleFavourite }) {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFavourited = (id) => favourites.some(m => m.id === id);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const base = "https://api.themoviedb.org/3";
        const endpoint = activeQuery
          ? `${base}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(activeQuery)}&page=${pageNum}`
          : `${base}/movie/popular?api_key=${API_KEY}&page=${pageNum}`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Failed to fetch movies (${res.status})`);
        const json = await res.json();

        setMovies(prev => (pageNum === 1 ? json.results : [...prev, ...json.results]));
        setTotalPages(json.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [activeQuery, pageNum]);

  function handleSearch() {
    const trimmed = query.trim();
    if (trimmed === activeQuery && pageNum === 1) return;
    setMovies([]);
    setActiveQuery(trimmed);
    setPageNum(1);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleClear() {
    setQuery("");
    setMovies([]);
    setActiveQuery("");
    setPageNum(1);
  }

  function handleLoadMore() {
    setPageNum(prev => prev + 1);
  }

  const isSearching = activeQuery.length > 0;
  const hasMore = pageNum < totalPages;

  return (
    <main className="movies-container">
      <h1 className="page-title">
        {isSearching ? `Results for "${activeQuery}"` : "Popular Movies"}
      </h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search movies"
        />
        <button onClick={handleSearch} disabled={loading}>
          Search
        </button>
        {isSearching && (
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="error-message" role="alert">
          &#9888; {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="empty-state">
          {isSearching
            ? `No results found for "${activeQuery}"`
            : "No movies available."}
        </div>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : PLACEHOLDER}
              alt={movie.title}
              loading="lazy"
            />
            <button
              className={`fav-btn ${isFavourited(movie.id) ? "fav-btn--active" : ""}`}
              onClick={() => onToggleFavourite(movie)}
              aria-label={isFavourited(movie.id) ? "Remove from favourites" : "Add to favourites"}
            >
              &#9829;
            </button>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <span className="release-year">
                  {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                </span>
                {movie.vote_average > 0 && (
                  <span className="rating">&#9733; {movie.vote_average.toFixed(1)}</span>
                )}
              </div>
            </div>
            {movie.overview && (
              <div className="movie-overlay">
                <p className="movie-overview">{movie.overview}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner" />
          <span>Loading...</span>
        </div>
      )}

      {!loading && hasMore && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </main>
  );
}

export default Movies;