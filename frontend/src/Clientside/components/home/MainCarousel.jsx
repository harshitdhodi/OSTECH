import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const MainCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [pageHeading, setPageHeading] = useState({ heading: '', subheading: '' });
 
  // Fetch popular products and set the carousel items dynamically
  useEffect(() => {
    fetch('/api/product/getPopularProducts')
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = data.data.map((item) => ({
          ...item,
          images: item.photo.map((photo) => `/api/image/download/${photo}`),
        }));
        setCarouselItems(updatedItems);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Fetch heading and subheading for the page
  useEffect(() => {
    fetch('/api/pageHeading/clientheading?pageType=product')
      .then((response) => response.json())
      .then((data) => {
        setPageHeading({
          heading: data.heading,
          subheading: data.subheading,
        });
      })
      .catch((error) => console.error('Error fetching page heading:', error));
  }, []);

  // Reversed items for the carousel
  const reversedItems = [...carouselItems].reverse().map((item, index) => (
    <div key={index} className="w-full min-h-[50vh] pb-10 md:min-h-[70vh] lg:min-h-[70vh] flex flex-col items-center bg-gray-100 px-4 md:px-6 lg:px-8">
      <div className="w-full lg:h-[50vh]  md:w-[70%] mb-5 lg:w-[50%] mt-8 md:mt-12 lg:mt-6 flex justify-center">
        <img
          className="cursor-pointer mb-5 sm:object-cover  object-contain w-full h-[50vh] md:h-[60vh] lg:h-[60vh] max-h-[80vh]"
          alt={item.title || 'Carousel image'}
          src={item.images[1]} // Display the first image
          loading="lazy"
        />
      </div>
    </div>
  ));

  const renderButton = (direction) => {
    const isNext = direction === 'next';
    return (
      <button
        className={`hidden md:block absolute inset-y-1/2 transform -translate-y-1/2 
        ${isNext ? 'right-4' : 'left-4'} 
        w-12 h-12 bg-gray-700 hover:bg-gray-800 text-white rounded-full 
        flex items-center justify-center transition-all duration-300 opacity-75 
        hover:opacity-100`}
        aria-label={`${isNext ? 'Next' : 'Previous'} slide`}
      >
        {isNext ? '❯' : '❮'}
      </button>
    );
  };
  
  

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  // Apply ScrollTrigger animations when heading and subheading come into view
  useEffect(() => {
    // Animation for page heading
    gsap.fromTo(
      '.page-heading', // Target the heading
      { scale: 0.8, opacity: 0 }, // Initial state
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.page-heading', // Trigger the animation when heading comes into view
          start: 'top 80%', // Animation starts when 80% of the element is in the viewport
          end: 'top 20%', // Animation ends when heading reaches 20% of the viewport
          scrub: true, // Smooth animation while scrolling
        },
      }
    );

    // Animation for subheading
    gsap.fromTo(
      '.page-subheading', // Target the subheading
      { scale: 0.8, opacity: 0 }, // Initial state
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.page-subheading', // Trigger the animation when subheading comes into view
          start: 'top 80%', // Animation starts when 80% of the element is in the viewport
          end: 'top 20%', // Animation ends when subheading reaches 20% of the viewport
          scrub: true, // Smooth animation while scrolling
        },
      }
    );
    
    // GSAP animation for carousel images (fade in with delay)
    gsap.fromTo(
      '.carousel-item', 
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.5,
        scrollTrigger: {
          trigger: '.carousel-item', // Target carousel items individually
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div className='flex flex-col justify-center bg-gray-100 items-center '>
        <h2 className='page-heading text-3xl md:text-4xl mt-5 pl-5 sm:mt-12 lg:text-4xl font-bold  sm:pl-2 mb-2 text-[#052852]'>{pageHeading.heading}</h2>
        <p className='page-subheading text-lg text-gray-700 w-[80%] lg:text-center lg:w-[70%]'>
          {pageHeading.subheading}
        </p>
      </div>
      <div className="relative w-full">
        <AliceCarousel
          items={reversedItems}
          autoPlay
          autoPlayInterval={3000}
          infinite
          animationDuration={1000}
          disableDotsControls
          responsive={responsive}
          renderPrevButton={() => renderButton('prev')}
          renderNextButton={() => renderButton('next')}
          mouseTracking
          touchTracking
          ssrSilentMode
        />
      </div>
    </>
  );
};

export default MainCarousel;
