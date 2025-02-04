import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent } from "../Product/Card";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

const VideoPlayer = ({ video, onError }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Already set to true by default
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => { 
    if (videoRef.current) {
      videoRef.current.muted = true; // Force mute when video loads
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []); // Remove isMuted dependency since we always want it muted initially

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return video.youtubeId ? (
    <div className="relative w-full aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1&autoplay=1&loop=1&mute=1`}
        title={video.title}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) : (
    <div className="relative w-full aspect-video group">
      <video
        ref={videoRef}
        src={`/api/upload/play/${video.videoId}`}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onError={onError}
        autoPlay={true} // Ensure autoplay is set
        loop={true} // Loop the video when it ends
      />
      
      {/* Custom Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between text-black">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay} className="hover:text-blue-400">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={toggleMute} className="hover:text-blue-400">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <span className="text-sm">{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
              }
            }} className="hover:text-blue-400">
              <RotateCcw size={20} />
            </button>
            <button onClick={handleFullScreen} className="hover:text-blue-400">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const VideoCard = ({ video }) => {
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${
        error ? 'border-red-500' : 'hover:shadow-lg hover:shadow-[#1290ca]/50 hover:scale-105'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {error ? (
          <div className="aspect-video bg-gray-100 flex items-center justify-center text-red-500 p-4 text-center">
            <p>{error}</p>
          </div>
        ) : (
          <VideoPlayer 
            video={video} 
            onError={() => setError('Error loading video')}
          />
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 text-sm">{video.channel}</p>
          {/* <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500 text-sm">{video.views.toLocaleString()} views</p>
            <span className="text-gray-500 text-sm">{video.duration}</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/video/getvideo');
        // Filter videos to include only those with a YouTube ID
        const filteredVideos = response.data.data.filter(video => video.youtubeId);
        setVideos(filteredVideos);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative mx-auto px-4 py-8">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};


export default VideoGrid;