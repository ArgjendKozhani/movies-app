import "./Navbar.css";

function Navbar({ page, onNavigate, favouriteCount }) {
  return (
    <header className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate("movies")} role="button" style={{ cursor: "pointer" }}>
        Movie<span className="brand-accent">Net</span>
      </div>
      <nav className="navbar-links">
        <button
          className={`nav-link ${page === "movies" ? "active" : ""}`}
          onClick={() => onNavigate("movies")}
        >
          Movies
        </button>
        <button
          className={`nav-link ${page === "favourites" ? "active" : ""}`}
          onClick={() => onNavigate("favourites")}
        >
          Favourites
          {favouriteCount > 0 && (
            <span className="fav-badge">{favouriteCount}</span>
          )}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;