import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const VideoBannerSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [bannerData, setBannerData] = useState(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  // Fetch the banner data when the component mounts
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('/api/banner1/getAll');
        if (response.data && response.data.data && response.data.data.length > 0) {
          const data = response.data.data[0]; // Assuming you want the first banner
          setBannerData(data);

          // Dynamically setting the background image URL
          const imageName = data.images; // Assuming 'images' field has the image name
          setBackgroundImageUrl(`/api/upload/download/${imageName}`);
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  if (!bannerData) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const { videoLink, title, subtitle } = bannerData;

  return (
    <>
      <div
        className="relative h-[60vh] -mt-7 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`, // Dynamically set background image
        }}
      >
        {/* Blue overlay with transparency */}
        <div className="absolute inset-0 bg-blue-900/60" />

        {/* Content container */}
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          {/* Small line above title */}
          <div className="w-12 h-0.5 bg-blue-400 mb-6" />

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title || 'What We Leverage?'}
          </h2>

          {/* Subtitle */}
          <p className="text-lg mb-6">
            {subtitle || 'Watch our latest development.'}
          </p>

          {/* Watch text and play button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 
                       flex items-center justify-center mb-4 transition-all
                       border border-white/30 hover:scale-110 group"
            >
              {/* Play icon with glow effect */}
              <div
                className="w-0 h-0 border-t-[15px] border-t-transparent 
                            border-l-[25px] border-l-white 
                            border-b-[15px] border-b-transparent
                            ml-2 group-hover:border-l-blue-200
                            transition-colors relative"
              >
                <div className="absolute inset-0 blur-sm opacity-75 scale-150 bg-white rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onClose={() => setIsVideoOpen(false)}>
        <DialogTitle className="p-6 flex justify-between items-center">
          {title || 'Our Latest Development'}
          <IconButton
            aria-label="close"
            onClick={() => setIsVideoOpen(false)}
            style={{ color: 'gray' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="xl:w-[600px] h-[50vh] p-0 overflow-hidden">
          <div className="relative pb-[56.25%] h-0 w-full">
            <iframe
              width="100%" // Take full width of the container
              height="100%" // Take full height of the container
              src={videoLink} // Use the videoLink from the banner data
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoBannerSection;
