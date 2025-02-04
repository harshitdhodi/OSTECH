import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../Clientside/components/Banner';
import AboutUs from '../../Clientside/components/home/AboutUs';
import OurClientsPage from '../../Clientside/components/home/OurClients';
import MissionVisionSection from '../../Clientside/components/aboutUs/MissionVision';
import FAQSection from '../../Clientside/components/aboutUs/FAQ';
import VideoBanner from '../../Clientside/components/home/PlayBanner2';
import Footer from '../../Clientside/components/home/Footer';
import ValuesCarousel from '../components/home/OurValue';

const AboutUsPage = () => {
  const [bannerData, setBannerData] = useState({ backgroundImage: '', title: '' });

  useEffect(() => {
    // Fetch banner data from the API
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('/api/banner/getBannersBySection?section=About');
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
    <div className="pt-[4%]">
      <Banner backgroundImage={bannerData.backgroundImage} title={bannerData.title} />
      <div className="-mt-10">
        <AboutUs />
      </div>
      <FAQSection />
      <MissionVisionSection />
      <div>
        <OurClientsPage />
      </div>
      <div>
        <ValuesCarousel />
      </div>
      <VideoBanner />
      <Footer />
    </div>
  );
};

export default AboutUsPage;
