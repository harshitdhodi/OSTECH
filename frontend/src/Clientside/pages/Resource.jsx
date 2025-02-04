import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import VideoGrid from '../../Clientside/components/resource/ResourceGrid';
import Footer from '../../Clientside/components/home/Footer';

const Resource = () => {
  const [bannerData, setBannerData] = useState({ backgroundImage: '', title: '' });

  useEffect(() => {
    // Fetch banner data from the API
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('/api/banner/getBannersBySection?section=Resources');
        const banners = response.data.banners;

        if (banners && banners.length > 0) {
          const banner = banners[0]; // Assume the first banner in the array is the relevant one
          setBannerData({
            backgroundImage: `/api/image/download/${banner.photo[0]}`, // Update path as per your setup
            title: banner.title,
          });
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="pt-[5%]">
      <Banner backgroundImage={bannerData.backgroundImage} title={bannerData.title} />
      <VideoGrid />
      <Footer />
    </div>
  );
};

export default Resource;
