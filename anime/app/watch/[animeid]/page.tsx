'use client'
import React, { useState, useRef, useEffect } from 'react';
import 'plyr/dist/plyr.css';
import axios from 'axios';
import Link from 'next/link';
import Hls from 'hls.js';
import Plyr from 'plyr';

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState<string>(localStorage.getItem("url") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodeRange, setEpisodeRange] = useState<number>(0);
  const unmodified = localStorage.getItem('animeInfo');
  const data = JSON.parse(unmodified);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr>();
  const hlsRef = useRef<Hls | null>(null);

  const fetchsources = async (epid: string) => {
    try {
      const sources = await axios.get(`/api/episodeSources/${epid}`);
      return sources;
    } catch (error) {
      console.error('Error fetching sources:', error);
      setError('Failed to fetch video sources');
      throw error;
    }
  };

  async function setepsource(epid: string) {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchsources(epid);
      const url = response.data.sources[4].url;
      localStorage.setItem('url', url);
      setVideoUrl(url);
    } catch (error) {
      setError('Failed to load episode');
      console.error('Error setting episode source:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!videoRef.current) return;

    const initPlayer = () => {
      // Destroy existing player if it exists
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      const player = new Plyr(videoRef.current!, {
        controls: [
          'play-large', // The large play button in the center
          'restart', // Restart playback
          'rewind', // Rewind by the seek time (default 10 seconds)
          'play', // Play/pause playback
          'fast-forward', // Fast forward by the seek time (default 10 seconds)
          'progress', // The progress bar and scrubber for playback and buffering
          'current-time', // The current time of playback
          'duration', // The full duration of the media
          'mute', // Toggle mute
          'volume', // Volume control
          'captions', // Toggle captions
          'settings', // Settings menu
          'pip', // Picture-in-picture (currently Safari only)
          'airplay', // Airplay (currently Safari only)
          'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
          'fullscreen', 
        ],
        quality: {
          default: 576,
          options: [1080, 720, 480, 360]
        }
      });

      player.on('ready', () => setLoading(false));
      player.on('error', (error) => {
        console.error('Plyr error:', error);
        setError('Video playback error');
      });

      playerRef.current = player;
    };

    // Cleanup existing HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    try {
      if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoRef.current.src = videoUrl;
        initPlayer();
      } else if (Hls.isSupported() && videoUrl) {
        const hls = new Hls({
          maxLoadingDelay: 4,
          maxRetryCount: 8,
          maxMaxRetryCount: 3,
          startLevel: -1,
          xhrSetup: (xhr) => {
            xhr.withCredentials = false;
          }
        });

        hlsRef.current = hls;
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS Manifest loaded');
          initPlayer();
          videoRef.current?.play().catch(err => {
            console.log('Autoplay prevented:', err);
            setError('Click play to start video');
          });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('Network error, trying to recover...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('Media error, trying to recover...');
                hls.recoverMediaError();
                break;
              default:
                console.error('Fatal error:', data);
                hls.destroy();
                setError('Failed to load video');
                break;
            }
          }
        });
      }
    } catch (err) {
      console.error('Error initializing video player:', err);
      setError('Failed to initialize video player');
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <div className="flex flex-col min-h-screen bg-black/50 backdrop-blur-md">
      <div className="flex flex-row flex-1 p-4 gap-4">
        {/* Episodes Panel */}
        {/* ... your existing episodes panel code ... */}
                {/* Episodes Panel */}
                <div className="w-72 bg-gray-900 rounded-lg flex flex-col">
          <div className="p-3 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Episodes</h2>
          </div>
          <div className="p-2 overflow-y-auto h-[calc(100vh-8rem)]">

            {/* Render Dropdown if Episodes are more than 100 */}
            {data?.episodes.length > 100 && (
              <select
                className="mb-2 w-full p-2 bg-white text-black rounded"
                onChange={(e) => setEpisodeRange(parseInt(e.target.value, 10))}
                value={episodeRange}
              >
                {Array.from(
                  { length: Math.ceil(data.episodes.length / 100) },
                  (_, i) => i
                ).map((rangeIndex) => (
                  <option key={rangeIndex} value={rangeIndex}>
                    Episodes {rangeIndex * 100 + 1} - {(rangeIndex + 1) * 100}
                    
                  </option>
                ))}
              </select>
            )}

            {/* Episode Grid */}
            <div className="grid grid-cols-5 gap-1 mx-1">
              {data?.episodes
                .slice(episodeRange * 100, (episodeRange + 1) * 100)
                .map((episode, index) => (
                  
                <Link   href={{
                  pathname: `/watch/${data.id}`,
                  query: { epid: data?.episodes[index].id }
                }} onClick={()=>{
                  setepsource(data.episodes[index].id)}}>
                  <div
                    key={index}
                    onClick={() => setSelectedEpisode(episodeRange * 100 + index + 1)}
                    className={`
                      w-12 h-12 flex items-center justify-center
                      ${selectedEpisode === episodeRange * 100 + index + 1
                        ? 'bg-white text-black font-semibold'
                        : 'bg-black hover:bg-gray-700 text-white font-semibold'
                      }
                      cursor-pointer rounded transition-colors
                      text-xs font-medium
                    `}
                  >
                    {episodeRange * 100 + index + 1}
                    {/* <Link href={`/watch/${data?.animeid}/${ep[index].id}`}>
                          View Anime
                         </Link> */}
                  </div>
                </Link>
                ))}
            </div>
          </div>
        </div>


        {/* Video Player */}
        <div className="flex-1 flex flex-col bg-gray-900 rounded-lg p-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="text-white bg-red-500/80 px-4 py-2 rounded">
                  {error}
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="plyr-react plyr w-full h-full"
              crossOrigin="anonymous"
              playsInline
            />
          </div>
          
          <p className='text-white mt-4'>{data?.description}</p>
          
          {/* Comment section */}
          <div className="mt-4">
            <h1 className="text-white text-lg font-semibold">Comments</h1>
            <input 
              type="text" 
              className="mt-2 w-full p-2 bg-gray-800 text-white rounded"
              placeholder="Add a comment..."
            />
          </div>
        </div>

        {/* Anime Details */}
        <div className="w-96 bg-gray-900 rounded-lg overflow-hidden">
          <div className="h-[calc(100vh-8rem)] overflow-y-auto">
            <img 
              src={data?.image} 
              alt={data?.title} 
              className="object-cover"
            />
            
            <div className="p-4 space-y-4">
              <div>
                <h1 className="text-lg font-bold text-white">{data?.title}</h1>
                <h3 className="text-gray-400 text-xs">{data?.japaneseTitle}</h3>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {data?.genres?.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div>
                <p className={`text-gray-300 text-xs ${!isDescriptionExpanded && "line-clamp-3"}`}>
                  {data?.description}
                </p>
                <button 
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-blue-400 text-xs mt-1 hover:text-blue-300"
                >
                  {isDescriptionExpanded ? "Show Less" : "Show More"}
                </button>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-800">
                <p className="text-xs">
                  <span className="text-gray-400">Rating:</span>
                  <span className="text-yellow-400 ml-2">{data?.rating || 'N/A'}</span>
                </p>
                <p className="text-xs text-gray-300">
                  <span className="text-gray-400">Premiered:</span>
                  <span className="ml-2">{data?.premiered}</span>
                </p>
                <p className="text-xs text-gray-300">
                  <span className="text-gray-400">Status:</span>
                  <span className="ml-2">{data?.status}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ... your existing anime details code ... */}
      </div>
    </div>
  );
};

export default VideoPlayer;