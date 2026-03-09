import "./Favourites.css";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER = "https://placehold.co/500x750/1a1a2e/666666?text=No+Poster";

function Favourites({ favourites, onToggleFavourite }) {
  return (
    <main className="movies-container">
      <h1 className="page-title">My Favourites</h1>

      {favourites.length === 0 ? (
        <div className="fav-empty">
          <span className="fav-empty-icon">&#9829;</span>
          <p>You haven&apos;t added any favourites yet.</p>
          <p className="fav-empty-hint">Click the ♥ on any movie to save it here.</p>
        </div>
      ) : (
        <div className="movie-list">
          {favourites.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : PLACEHOLDER}
                alt={movie.title}
                loading="lazy"
              />
              <button
                className="fav-btn fav-btn--active"
                onClick={() => onToggleFavourite(movie)}
                aria-label="Remove from favourites"
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
      )}
    </main>
  );
}

export default Favourites;
