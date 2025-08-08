// src/app/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  video_url?: string;
}

interface MovieList {
  title: string;
  movies: Movie[];
}

interface PreviewModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

function PreviewModal({ movie, isOpen, onClose }: PreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Auto-play video when modal opens
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  }, [isOpen, movie]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen || !movie) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{
        animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.3s ease-in',
      }}
    >
      <div
        className="relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
        style={{
          animation: isOpen ? 'zoomIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'zoomOut 0.3s ease-in',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Close preview"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Section */}
        <div className="relative aspect-video bg-black">
          {movie.video_url ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              muted
              preload="metadata"
              poster={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            >
              <source src={movie.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full bg-gradient-to-t from-black via-black/50 to-transparent">
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="bg-red-600 rounded-full p-4 mb-4 inline-block">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">Preview not available</p>
                  <p className="text-sm opacity-75">Click below to watch full movie</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-6 bg-gray-900">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span className="border border-gray-500 px-2 py-0.5 text-xs">HD</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-2xl">
                {movie.overview}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-lg flex items-center space-x-2 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Play</span>
            </button>
            <button className="bg-gray-600/70 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors" title="Add to My List">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button className="bg-gray-600/70 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors" title="Like">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes zoomIn {
          from { 
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes zoomOut {
          from { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to { 
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [movieLists, setMovieLists] = useState<MovieList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMovie, setPreviewMovie] = useState<Movie | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Sample video URLs (you can replace these with real trailer URLs)
  const sampleVideos = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  ];

  const openPreview = (movie: Movie) => {
    // Add a sample video URL for demo purposes
    const movieWithVideo = {
      ...movie,
      video_url: sampleVideos[movie.id % sampleVideos.length]
    };
    setPreviewMovie(movieWithVideo);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewMovie(null), 300);
  };

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
        
        // Enhanced fallback data with video URLs
        setMovieLists([
          { 
            title: "Most Rewatched by Members", 
            movies: [
              { 
                id: 1, 
                title: 'Merlin', 
                poster_path: '/gVwIJOkGIcg7kSGpXLJzKVhKNm6.jpg', 
                backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', 
                overview: "A young warlock's adventures in Camelot as he discovers his magical destiny.",
                vote_average: 8.3,
                release_date: "2008-09-20",
                video_url: sampleVideos[0]
              },
              { 
                id: 2, 
                title: 'S.W.A.T.', 
                poster_path: '/gX4PJj9P3YKOIjxPolyEQQGhMJi.jpg', 
                backdrop_path: '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg', 
                overview: "Elite tactical unit takes on dangerous missions in Los Angeles.",
                vote_average: 7.8,
                release_date: "2017-11-02",
                video_url: sampleVideos[1]
              },
              { 
                id: 3, 
                title: 'Young Sheldon', 
                poster_path: '/tKwjkqTSq5fJdSxIk4yOh61tOKD.jpg', 
                backdrop_path: '/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 
                overview: "The childhood of Sheldon Cooper in East Texas, exploring his genius mind.",
                vote_average: 8.1,
                release_date: "2017-09-25",
                video_url: sampleVideos[2]
              },
              { 
                id: 10, 
                title: 'Breaking Bad', 
                poster_path: '/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg', 
                backdrop_path: '/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg', 
                overview: "A high school chemistry teacher turned methamphetamine manufacturer.",
                vote_average: 9.5,
                release_date: "2008-01-20",
                video_url: sampleVideos[3]
              },
              { 
                id: 11, 
                title: 'Stranger Things', 
                poster_path: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg', 
                backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', 
                overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying forces.",
                vote_average: 8.7,
                release_date: "2016-07-15",
                video_url: sampleVideos[4]
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
                overview: "Hidden camera horror pranks on unsuspecting people in supernatural scenarios.",
                vote_average: 6.2,
                release_date: "2019-10-25",
                video_url: sampleVideos[5]
              },
              { 
                id: 5, 
                title: 'iZombie', 
                poster_path: '/q4nqNwAhzVR7JuYctrWJvUsCnmX.jpg', 
                backdrop_path: '/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg', 
                overview: "A zombie medical examiner solves crimes by eating brains and experiencing victims' memories.",
                vote_average: 7.9,
                release_date: "2015-03-17",
                video_url: sampleVideos[6]
              },
              { 
                id: 6, 
                title: 'Santa Clarita Diet', 
                poster_path: '/hz298a3RXi9f4pR32MhNyZeKqgK.jpg', 
                backdrop_path: '/TU9NIjwzjoKPwQHoHshkBcQX2wT.jpg', 
                overview: "A suburban mom becomes a zombie and must adapt to her new undead lifestyle.",
                vote_average: 7.5,
                release_date: "2017-02-03",
                video_url: sampleVideos[7]
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
                overview: "Time travelers prevent historical disasters while battling a mysterious organization.",
                vote_average: 8.0,
                release_date: "2016-10-03",
                video_url: sampleVideos[0]
              },
              {
                id: 8,
                title: 'Away',
                poster_path: '/yxMpoHO0CXP5o9gB7IfsciP6OPC.jpg',
                backdrop_path: '/gQ9G67LwX2k3Kmt1hV1Qc4P2dYQ.jpg',
                overview: "The first mission to Mars faces challenges that test the crew's resolve.",
                vote_average: 7.1,
                release_date: "2020-09-04",
                video_url: sampleVideos[1]
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

  // Featured movie for hero section
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
        
        {/* Movie Rows with Preview Functionality */}
        <div className="pb-20">
          {movieLists.map((list, index) => (
            <div key={`${list.title}-${index}`} className="relative group/row py-8">
              <div className="container mx-auto px-4 md:px-16">
                <h2 className="text-white text-xl md:text-2xl font-bold mb-4 group-hover/row:text-gray-300 transition-colors">
                  {list.title}
                </h2>
                
                <div className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide pb-4">
                  {list.movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="group relative min-w-0 flex-shrink-0 w-48 md:w-52 lg:w-56 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-20"
                      onClick={() => openPreview(movie)}
                    >
                      <div className="relative overflow-hidden rounded-lg bg-gray-800">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-72 md:h-80 object-cover transition-all duration-300 group-hover:scale-110"
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Movie Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">
                            {movie.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-xs text-gray-300">
                            <span className="bg-green-600 text-white px-1 py-0.5 rounded">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        movie={previewMovie}
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
    </main>
  );
}