import { useState, useEffect } from "react";
import { mockMovies } from "./mockData";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>(mockMovies);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) setMovies(mockMovies);
      else {
        const filtered = mockMovies.filter((m) =>
          m.title.toLowerCase().includes(query.toLowerCase())
        );
        setMovies(filtered);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "white",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "30px",
        }}
      >
        Movie Search
      </h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          style={{
            width: "320px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#111",
            color: "white",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>

      {movies.length > 0 ? (
        <>
          <h4
            style={{
              fontSize: "1.25rem",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            Now Showing
          </h4>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                style={{
                  position: "relative",
                  flex: "0 1 calc(14% - 18px)",
                  backgroundColor: "#111",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  color: "white",
                  minWidth: "150px",
                  maxWidth: "180px",
                  overflow: "hidden",
                }}
              >
                {/* Poster */}
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/150x225?text=No+Image"
                  }
                  alt={movie.title}
                  className="movie-poster"
                />

                {/* Hover Overlay */}
                <div className="movie-overlay">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>

                {/* Title and Release Date */}
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#1a1a1a",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      marginBottom: "4px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {movie.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#aaa",
                      margin: 0,
                    }}
                  >
                    {movie.release_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p
          style={{
            color: "#aaa",
            fontSize: "1rem",
            marginTop: "2rem",
          }}
        >
          No movies found
        </p>
      )}
    </div>
  );
}
