// src/components/MovieCard.tsx

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-card">
      {/* Replaced the Next.js <Image> component with a standard <img> tag */}
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="movie-poster"
      />
      <h3 className="movie-title">{movie.title}</h3>
    </div>
  );
}