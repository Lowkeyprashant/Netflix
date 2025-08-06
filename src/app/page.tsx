// src/app/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
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
        { title: "Most Rewatched by Members", url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}` },
        { title: "US TV Horror", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27` },
        { title: "Exciting US Sci-Fi TV", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878` },
        { title: "Popular on Netflix", url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1` },
        { title: "Award-Winning TV Shows", url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1` },
        { title: "Critically Acclaimed TV Comedies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35` },
        { title: "Netflix Originals", url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=213` },
        { title: "Continue Watching", url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1` }
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
        
        // Enhanced fallback data matching Netflix categories
        setMovieLists([
          { 
            title: "Most Rewatched by Members", 
            movies: [
              { 
                id: 1, 
                title: 'Merlin', 
                poster_path: '/gVwIJOkGIcg7kSGpXLJzKVhKNm6.jpg', 
                backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', 
                overview: "A young warlock's adventures in Camelot.",
                vote_average: 8.3,
                release_date: "2008-09-20"
              },
              { 
                id: 2, 
                title: 'S.W.A.T.', 
                poster_path: '/gX4PJj9P3YKOIjxPolyEQQGhMJi.jpg', 
                backdrop_path: '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg', 
                overview: "Elite tactical unit takes on dangerous missions.",
                vote_average: 7.8,
                release_date: "2017-11-02"
              },
              { 
                id: 3, 
                title: 'Young Sheldon', 
                poster_path: '/tKwjkqTSq5fJdSxIk4yOh61tOKD.jpg', 
                backdrop_path: '/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 
                overview: "The childhood of Sheldon Cooper in East Texas.",
                vote_average: 8.1,
                release_date: "2017-09-25"
              }
            ]
          },
          { 
            title: "US TV Horror", 
            movies: [
              { 
                id: 4, 
                title: 'Prank Encounters', 
                poster_path: '/aWlwUzWXWCE0RhzVj7SFOQmg3jA.jpg', 
                backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', 
                overview: "Hidden camera horror pranks on unsuspecting people.",
                vote_average: 6.2,
                release_date: "2019-10-25"
              },
              { 
                id: 5, 
                title: 'iZombie', 
                poster_path: '/q4nqNwAhzVR7JuYctrWJvUsCnmX.jpg', 
                backdrop_path: '/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg', 
                overview: "A zombie medical examiner solves crimes.",
                vote_average: 7.9,
                release_date: "2015-03-17"
              },
              { 
                id: 6, 
                title: 'Santa Clarita Diet', 
                poster_path: '/hz298a3RXi9f4pR32MhNyZeKqgK.jpg', 
                backdrop_path: '/TU9NIjwzjoKPwQHoHshkBcQX2wT.jpg', 
                overview: "A suburban mom becomes a zombie.",
                vote_average: 7.5,
                release_date: "2017-02-03"
              }
            ]
          },
          {
            title: "Exciting US Sci-Fi TV",
            movies: [
              {
                id: 7,
                title: 'Timeless',
                poster_path: '/7CozRNKmshrSu9xbUHlCBp6aNxF.jpg',
                backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg',
                overview: "Time travelers prevent historical disasters.",
                vote_average: 8.0,
                release_date: "2016-10-03"
              },
              {
                id: 8,
                title: 'Away',
                poster_path: '/yxMpoHO0CXP5o9gB7IfsciP6OPC.jpg',
                backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P2dYQ.jpg',
                overview: "The first mission to Mars faces challenges.",
                vote_average: 7.1,
                release_date: "2020-09-04"
              }
            ]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieLists.length === 0 && !isLoading) {
      fetchMovieData();
    }
  }, [movieLists, isLoading]);

  // Featured movie for hero section (Snow White & The Huntsman based on image)
  const featuredMovie = {
    id: 999,
    title: 'Snow White & The Huntsman',
    backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P21Fv.jpg',
    overview: 'In a twist to the fairy tale, the Huntsman ordered to take Snow White into the woods to be killed winds up becoming her protector and mentor in a quest to vanquish the Evil Queen.',
    vote_average: 7.2,
    release_date: '2012-05-30'
  };

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
      <Hero movie={featuredMovie} />
      
      {/* Content Container */}
      <div className="relative z-10 bg-black">
        {/* Error Message */}
        {error && (
          <div className="container mx-auto px-4 md:px-16">
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