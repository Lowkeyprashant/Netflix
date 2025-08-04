// src/app/movie/[id]/page.tsx

import Link from 'next/link';

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

function MovieCard({ movie }: { movie: Movie }) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-card">
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

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movieId = params.id;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const IMAGE_BASE_URL_BACKDROP = 'https://image.tmdb.org/t/p/original';

  let movie: MovieDetails | null = null;
  let similarMovies: Movie[] = [];
  let error = null;

  try {
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`, { cache: 'no-store' });
    const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`, { cache: 'no-store' });

    if (!movieRes.ok || !similarRes.ok) {
      throw new Error('Failed to fetch data');
    }

    movie = await movieRes.json();
    const similarData = await similarRes.json();
    similarMovies = similarData.results;

  } catch (err) {
    error = "Could not fetch movie details. Please try again later.";
    console.error(err);
    // Fallback to hardcoded data if API call fails
    movie = {
      id: 763212,
      title: "Lift",
      poster_path: '/gma8o1jWaSc6c31p94I1p2h53M6.jpg',
      backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg',
      overview: "An international heist crew, led by Cyrus Whitaker, races to lift $500 million in gold from a passenger plane at 40,000 feet.",
      release_date: "2024-01-10",
      vote_average: 6.5,
      genres: [{ id: 28, name: "Action" }, { id: 35, name: "Comedy" }],
    };
    similarMovies = [
      { id: 458156, title: 'John Wick: Chapter 3 - Parabellum', poster_path: '/udDclOQ75otK1j9nKglx9f3s.jpg' },
      { id: 299534, title: 'Avengers: Endgame', poster_path: '/or06FN3Dka5tukK1e9slAcn9zJl.jpg' },
      { id: 420817, title: 'Aladdin', poster_path: '/3iYQcrbbPUezgq7Lefz1kQ8L0Lp.jpg' },
    ];
  }

  if (error || !movie) {
    return (
      <main>
        <p className="text-center mt-8">{error || "Could not load movie details."}</p>
      </main>
    );
  }

  return (
    <main>
      <div 
        className="backdrop-container" 
        style={{ backgroundImage: `url(${IMAGE_BASE_URL_BACKDROP}${movie.backdrop_path})` }}
      >
        <div className="backdrop-overlay">
          <div className="container details-content-container">
            <div className="details-poster">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
              />
            </div>
            <div className="details-info">
              <h1>{movie.title}</h1>
              <p className="details-meta">
                <span>{movie.release_date.substring(0, 4)}</span>
                <span> | </span>
                <span>{movie.vote_average.toFixed(1)} / 10 IMDb</span>
              </p>
              <p className="details-genres">
                {movie.genres.map(genre => <span key={genre.id}>{genre.name}</span>)}
              </p>
              <p className="details-overview">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Similar Movies</h2>
        <div className="movie-grid">
          {similarMovies.map(similarMovie => (
            <Link key={similarMovie.id} href={`/movie/${similarMovie.id}`}>
              <MovieCard movie={similarMovie} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}