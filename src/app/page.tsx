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
        { title: "Popular Movies", url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1` },
        { title: "Top Rated", url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1` },
        { title: "Now Playing", url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1` },
        { title: "Upcoming", url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1` },
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
          movies: allData[index].results
        }));

        setMovieLists(lists);
        setError(null);

      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError("Could not fetch movies. Displaying sample data.");
        
        // Fallback to hardcoded data if API call fails
        setMovieLists([
          { 
            title: "Popular Movies", 
            movies: [
              { id: 763212, title: 'Lift', poster_path: '/gma8o1jWaSc6c31p94I1p2h53M6.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "An international heist crew, led by Cyrus Whitaker, races to lift $500 million in gold from a passenger plane at 40,000 feet." },
              { id: 609681, title: 'The Marvels', poster_path: '/9c693wV39Gq0fV0G5pB9G49L9m7.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "Carol Danvers gets her powers entangled with those of Kamala Khan and Monica Rambeau, forcing them to work together to save the universe." },
              { id: 872585, title: 'Oppenheimer', poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II." },
            ]
          },
          { 
            title: "Top Rated", 
            movies: [
              { id: 458156, title: 'John Wick: Chapter 3 - Parabellum', poster_path: '/udDclOQ75otK1j9nKglx9f3rJKD.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "Super-assassin John Wick returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail." },
              { id: 299534, title: 'Avengers: Endgame', poster_path: '/or06FN3Dka5tukK1e9sl1g8tJJl.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos." },
              { id: 420817, title: 'Aladdin', poster_path: '/3iYTgCssKGgKOtQXs8CgydZKHys.jpg', backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg', overview: "A kindhearted street thief and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true." },
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

  return (
    <main>
      {featuredMovie && <Hero movie={featuredMovie} />}
      
      <div className="container">
        <SearchBar />
        
        {error && <p className="text-center my-4 text-red-500">{error}</p>}
        {isLoading && <p className="text-center my-4 text-white">Loading movies...</p>}
        
        {movieLists.map((list) => (
          <MovieRow key={list.title} title={list.title} movies={list.movies} />
        ))}
      </div>
    </main>
  );
}