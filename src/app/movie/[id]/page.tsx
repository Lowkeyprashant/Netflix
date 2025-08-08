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
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path?: string }[];
  credits?: {
    cast: { id: number; name: string; character: string; profile_path?: string }[];
  };
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

function MovieCard({ movie }: { movie: Movie }) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg bg-gray-800">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold">Play</p>
          </div>
        </div>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <span className="bg-green-600 text-white px-1.5 py-0.5 rounded">
              {Math.round(movie.vote_average * 10)}%
            </span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
        </div>

        {/* Netflix Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">N</span>
        </div>
      </div>

      {/* CSS Styles to avoid inline styles */}
      <style jsx>{`
        .hero-backdrop {
          background-image: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path});
        }
      `}</style>
    </div>
  );
}

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movieId = params.id;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  let movie: MovieDetails | null = null;
  let similarMovies: Movie[] = [];
  let error = null;

  try {
    if (!API_KEY) {
      throw new Error('TMDB API key not found');
    }

    // Fetch movie details with credits
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`,
      { cache: 'no-store' }
    );
    
    const similarRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`,
      { cache: 'no-store' }
    );

    if (!movieRes.ok || !similarRes.ok) {
      throw new Error('Failed to fetch data');
    }

    movie = await movieRes.json();
    const similarData = await similarRes.json();
    similarMovies = similarData.results.filter((m: Movie) => m.poster_path).slice(0, 12);

  } catch (err) {
    error = "Could not fetch movie details. Please try again later.";
    console.error(err);
    
    // Enhanced fallback data
    movie = {
      id: parseInt(movieId),
      title: "The Dark Knight",
      poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg',
      overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      release_date: "2008-07-16",
      vote_average: 8.5,
      runtime: 152,
      genres: [
        { id: 28, name: "Action" },
        { id: 80, name: "Crime" },
        { id: 18, name: "Drama" }
      ],
      production_companies: [
        { id: 9993, name: "DC Entertainment" },
        { id: 9996, name: "Warner Bros. Pictures" }
      ],
      credits: {
        cast: [
          { id: 3894, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: "/3qx2QFUbG6t6IlzR0F9k3Z6Yhf7.jpg" },
          { id: 1327, name: "Heath Ledger", character: "Arthur Fleck / Joker", profile_path: "/5Y9HnYYa9jF4NunY9lSgJGjSe8E.jpg" },
          { id: 64, name: "Gary Oldman", character: "James Gordon", profile_path: "/2v9FVVBUrrkW2m3QOcYkuhq9A6o.jpg" }
        ]
      }
    };
    
    similarMovies = [
      { id: 155, title: 'The Dark Knight Rises', poster_path: '/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg', backdrop_path: '/f6ljQGv7WnJuwBPty017oPWfqjx.jpg', vote_average: 7.6, release_date: '2012-07-17' },
      { id: 272, title: 'Batman Begins', poster_path: '/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg', backdrop_path: '/bq4dq4cF8EbX3mYzWH60NqgAcXo.jpg', vote_average: 7.7, release_date: '2005-06-10' },
      { id: 268896, title: 'Joker', poster_path: '/udDclOQ75otK1j9nKglx9f3s.jpg', backdrop_path: '/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg', vote_average: 8.2, release_date: '2019-10-01' }
    ];
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-gray-400 mb-6">{error || "Could not load movie details."}</p>
          <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        <div 
          className="h-screen bg-cover bg-center bg-no-repeat hero-backdrop"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          }}
        >
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 md:px-16 pb-20">
              <div className="grid md:grid-cols-3 gap-8 items-end">
                {/* Movie Poster */}
                <div className="md:col-span-1">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full max-w-sm mx-auto md:mx-0 rounded-lg shadow-2xl"
                  />
                </div>

                {/* Movie Info */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
                    
                    <div className="flex items-center space-x-4 text-lg mb-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded font-bold">
                        {Math.round(movie.vote_average * 10)}% Match
                      </span>
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                      {movie.runtime && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
                      <span className="border border-gray-400 px-2 py-1 text-sm">HD</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {movie.genres.map(genre => (
                        <span key={genre.id} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-gray-200">
                    {movie.overview}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-lg flex items-center space-x-2 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button className="bg-gray-600/70 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg flex items-center space-x-2 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>My List</span>
                    </button>
                    <button className="bg-gray-600/70 hover:bg-gray-600 text-white p-4 rounded-lg transition-colors" title="Like">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Movie Info */}
      <div className="container mx-auto px-4 md:px-16 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Cast */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 8).map(actor => (
                  <div key={actor.id} className="text-center">
                    <div className="mb-3">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm">{actor.name}</h3>
                    <p className="text-gray-400 text-xs">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Movie Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-400 mb-1">Release Date</h3>
                <p>{new Date(movie.release_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              
              {movie.runtime && (
                <div>
                  <h3 className="font-semibold text-gray-400 mb-1">Runtime</h3>
                  <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-400 mb-1">Rating</h3>
                <p>{movie.vote_average.toFixed(1)}/10 IMDb</p>
              </div>

              {movie.production_companies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-400 mb-1">Production</h3>
                  <p>{movie.production_companies.map(company => company.name).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 md:px-16 pb-20">
          <h2 className="text-2xl font-bold mb-8">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarMovies.map(similarMovie => (
              <Link key={similarMovie.id} href={`/movie/${similarMovie.id}`}>
                <MovieCard movie={similarMovie} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 md:px-16 mb-8">
          <div className="bg-yellow-600 text-black px-4 py-3 rounded-lg">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        </div>
      )}
    </main>
  );
}