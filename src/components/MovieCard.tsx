import type { Movie } from "../App";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div
      className="
        flex-shrink-0
        bg-gray-900
        rounded-lg
        shadow-md
        overflow-hidden
        w-36 sm:w-40 md:w-44
        transform
        transition-transform
        duration-300
        hover:scale-105
        hover:shadow-xl
        cursor-pointer
      "
    >
      <img
        src={poster}
        alt={movie.title}
        className="w-full h-52 object-cover object-center"
      />
      <div className="p-2">
        <h3 className="font-semibold text-xs truncate">{movie.title}</h3>
        <p className="text-[10px] text-gray-400">{movie.release_date}</p>
      </div>
    </div>
  );
};
