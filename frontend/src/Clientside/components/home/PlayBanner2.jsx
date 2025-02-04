import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VideoBanner = () => {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the latest video data when the component mounts
    axios
      .get('/api/video/getLatestOne')
      .then((response) => {
        // Accessing data from the API response
        console.log(response.data);
        setVideoData(response.data); // The actual video data is inside `data`
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching video data:', error);
      });
  }, []);

  if (error) {
    return <div>Error fetching video data.</div>; // Show error message if fetching fails
  }

  if (!videoData) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const videoId = videoData.data?.youtubeId;  // Access the videoId from the nested data object
  const hasVideoId = videoId && videoId !== '';

  return (
    <div className="relative h-96 overflow-hidden  bg-transparent">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
  {hasVideoId ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            {/* Ensure videoId is correct and exists in the specified directory */}
            <source
              src={`${videoId}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full bg-black flex justify-center items-center text-white">
            {/* Fallback content if videoId is not available */}
            <p>Video not available.</p>
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#052852]/40" />
      </div>



      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left side with icon and text */}
          <div className="flex items-center space-x-4 text-center lg:text-left">
            {/* <div className="text-white hidden lg:block">
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 2L14.8 8.8L22 9.3L17 14.4L18.5 21.4L12 18L5.5 21.4L7 14.4L2 9.3L9.2 8.8L12 2Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="50%"
                  y="65%"
                  textAnchor="middle"
                  fill="currentColor"
                  className="text-3xl font-bold"
                >
                  5
                </text>
              </svg>
            </div> */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {videoData.data?.title || 'Delivering Excellence with Sustainability'}
            </h1>
          </div>

          {/* Right side button */}

          <Link to="/contact-us">

            <button
              style={{
                boxShadow:
                  '0 4px 8px rgba(140, 211, 235, 0.5), 0 3px 4px rgba(0, 10, 0, 0.1)',
              }}
              className="px-6 py-2 bg-[#f8f8f8] text-black font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Get A Quote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
