import React, { useState, useEffect } from 'react';
// import Navbar from '../components/home/Navbar';
import { HomeCarousel  } from '../../Clientside/components/home/HomeCarousal';
import ProductGridView from '../../Clientside/components/home/ProductGridView';
import AboutUs from '../../Clientside/components/home/AboutUs';
import ValuesCarousel from '../../Clientside/components/home/OurValue';
import VideoBannerSection from '../../Clientside/components/home/PlayBanner';
import VideoBanner from '../../Clientside/components/home/PlayBanner2';
import OurClientsPage from '../../Clientside/components/home/OurClients';
import Footer from '../../Clientside/components/home/Footer';
// import Counter from '../components/home/Counter';
import MainCarousel from '../../Clientside/components/home/MainCarousel';

const Homepage = () => {
    const [isVisible, setIsVisible] = useState({});
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          });
        },
        { threshold: 0.1 }
      );
  
      document.querySelectorAll('[data-animate]').forEach(
        el => observer.observe(el)
      );
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <div className="min-h-screen ">
        {/* <Navbar /> */}
        <HomeCarousel  />
        <div className=''>
        <ProductGridView />
        </div>
       <div className='mt-10'>
       <AboutUs />
       </div>
       <VideoBanner  />
        {/* <Counter /> */}
       <div className=''>
       <OurClientsPage />
       </div>
      <div className=''>
      <MainCarousel  />
      </div>
        {/* <ValuesCarousel />  */}
     <div className=''>
     <VideoBannerSection />
     </div>
     
        <Footer />
      </div>
    );
  };
  
  export default Homepage;