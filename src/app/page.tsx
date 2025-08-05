// src/app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface MovieList {
  title: string;
  movies: Movie[];
}

export default function Home() {
  const [movieLists, setMovieLists] = useState<MovieList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      
      const endpoints = [
        { title: "Trending Now", url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}` },
        { title: "Popular on Netflix", url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1` },
        { title: "Top Rated", url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1` },
        { title: "Action Movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28` },
        { title: "Comedy Movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35` },
        { title: "Horror Movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27` },
        { title: "Romance Movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749` },
        { title: "Documentaries", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99` },
      ];

      try {
        const responses = await Promise.all(
          endpoints.map(endpoint => fetch(endpoint.url))
        );

        const allDataValid = responses.every(res => res.ok);
        
        if (!allDataValid) {
          throw new Error('Failed to fetch movie data');
        }

        const dataPromises = responses.map(res => res.json());
        const allData = await Promise.all(dataPromises);

        const lists = endpoints.map((endpoint, index) => ({
          title: endpoint.title,
          movies: allData[index].results.filter((movie: Movie) => movie.poster_path && movie.backdrop_path)
        }));

        setMovieLists(lists);
        setError(null);

      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError("Using sample data due to API issues.");
        
        // Enhanced fallback data with proper poster paths
        setMovieLists([
          { 
            title: "Trending Now", 
            movies: [
              { 
                id: 872585, 
                title: 'Oppenheimer', 
                poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', 
                backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', 
                overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
                vote_average: 8.3,
                release_date: "2023-07-20"
              },
              { 
                id: 346698, 
                title: 'Barbie', 
                poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', 
                backdrop_path: '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg', 
                overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
                vote_average: 7.2,
                release_date: "2023-07-21"
              },
              { 
                id: 298618, 
                title: 'The Flash', 
                poster_path: '/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg', 
                backdrop_path: '/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 
                overview: "Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes.",
                vote_average: 6.8,
                release_date: "2023-06-16"
              },
            ]
          },
          { 
            title: "Popular on Netflix", 
            movies: [
              { 
                id: 299534, 
                title: 'Avengers: Endgame', 
                poster_path: '/or06FN3Dka5tukK1e9sl1g8tJJl.jpg', 
                backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', 
                overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos.",
                vote_average: 8.4,
                release_date: "2019-04-26"
              },
              { 
                id: 19995, 
                title: 'Avatar', 
                poster_path: '/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', 
                backdrop_path: '/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg', 
                overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission.",
                vote_average: 7.6,
                release_date: "2009-12-18"
              },
              { 
                id: 496243, 
                title: 'Parasite', 
                poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 
                backdrop_path: '/TU9NIjwzjoKPwQHoHshkBcQX2wT.jpg', 
                overview: "All unemployed, Ki-taek and his family take peculiar interest in the wealthy and glamorous Parks.",
                vote_average: 8.5,
                release_date: "2019-05-30"
              },
            ]
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieLists.length === 0 && !isLoading) {
      fetchMovieData();
    }
  }, [movieLists, isLoading]);

  const featuredMovie = movieLists.length > 0 ? movieLists[0].movies[0] : null;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Netflix...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      {featuredMovie && <Hero movie={featuredMovie} />}
      
      {/* Content Container */}
      <div className="relative z-10 bg-black">
        {/* Search Section */}
        <div className="container pt-8">
          <SearchBar />
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="container">
            <div className="bg-yellow-600 text-white px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">⚠️ {error}</p>
            </div>
          </div>
        )}
        
        {/* Movie Rows */}
        <div className="pb-20">
          {movieLists.map((list, index) => (
            <MovieRow key={`${list.title}-${index}`} title={list.title} movies={list.movies} />
          ))}
        </div>
      </div>
    </main>
  );
}