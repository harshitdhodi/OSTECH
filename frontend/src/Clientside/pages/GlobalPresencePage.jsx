import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import GlobalPresence from '../components/GlobalPresence/GlobalPresence';
import Footer from '../components/home/Footer';
import ImageGrid from '../components/GlobalPresence/CardImage';
import AnimatedTeamCarousel from '../components/GlobalPresence/OurTeam';
import MetricsDisplay from '../components/GlobalPresence/Counter';
import Infographic from '../components/our_capabilities/Infographic';
import Services from '../components/our_capabilities/Service';
import PackagingMachineProcess from '../components/our_capabilities/OurProcess';


const GlobalPresencePage = () => {
  const [bannerData, setBannerData] = useState({ backgroundImage: '', title: '' });

  useEffect(() => {
    // Fetch banner data from the API
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('/api/banner/getBannersBySection?section=Global Presence');
        const banners = response.data.banners;

        if (banners && banners.length > 0) {
          const banner = banners[0]; // Assume the first banner in the array is the relevant one
          setBannerData({
            backgroundImage: `/api/image/download/${banner.photo[0]}`, // Update path as per your setup
            title: banner.title,
            details:banner.details
          });
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    }; 

    fetchBannerData(); 
    
  }, []);

  return (
    <div className="pt-[4%]">
      <Banner backgroundImage={bannerData.backgroundImage} title={bannerData.title} />
      {/* <GlobalPresence /> */}
      {/* <ImageGrid /> */}
      <Infographic headingPera={bannerData.details} />
      <Services />
      <div>

      <PackagingMachineProcess />
      {/* <AnimatedTeamCarousel /> */}
      </div>
      {/* <MetricsDisplay /> */}
      <Footer />
    </div>  
  ); 
};

export default GlobalPresencePage;
