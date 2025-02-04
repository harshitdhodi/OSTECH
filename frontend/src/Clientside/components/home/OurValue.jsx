import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ValuesCarousel = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('/api/corevalue/getAllCorevalue')
      .then(response => response.json())
      .then(data => {
        setValues(data.data.map(value => ({
          title: value.title,
          description: value.description, // Use HTML content directly
          image: `/api/image/download/${value.photo[0]}` // Adjust the path as needed
        })));
      })
      .catch(error => console.error('Error fetching core values:', error));
  }, []);

  const renderSlide = (value) => (
    <div className="px-2 md:px-4 w-full">
      <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg w-full max-w-sm mx-auto
                    min-h-[250px] md:min-h-[300px] lg:min-h-[400px] text-center
                    transition-all duration-500
                    hover:shadow-2xl hover:shadow-[#1290ca]/30
                    shadow-xl shadow-[#1290ca]/20">
        <div className="mb-4 md:mb-6 flex items-center justify-center">
          <img src={value.image} alt={value.title} className="max-h-[50px] md:max-h-[70px] object-contain" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 text-[#052852]">
          {value.title}
        </h3>
        <div
          className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: value.description }} // Render HTML content
        />
      </div>
    </div>
  );

  const responsive = {
    0: { 
      items: 1,
      itemsFit: 'contain'
    },
    640: { 
      items: 2,
      itemsFit: 'contain'
    },
    1024: { 
      items: 3,
      itemsFit: 'contain'
    }
  };

  const renderDotsItem = ({ isActive }) => (
    <button className={`
      transition-all duration-500 ease-in-out rounded-full mx-1
      ${isActive 
        ? 'w-8 h-2 bg-[#1290ca]' 
        : 'w-2 h-2 bg-white/50 hover:bg-[#1290ca]/50'}`}
    />
  );

  const items = values.map((value) => renderSlide(value));

  return (
    <div className="bg-gradient-to-b from-[#1290ca]/10 to-[#1290ca]/10">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#052852] mb-8 md:mb-12">
          Our Values
        </h1>

        <div className="relative">
          <AliceCarousel
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            autoPlay
            autoPlayInterval={3000}
            animationDuration={800}
            infinite
            mouseTracking
            disableDotsControls={false}
            renderDotsItem={renderDotsItem}
            paddingLeft={20}
            paddingRight={20}
            renderPrevButton={() => (
              <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                               p-2 md:p-3 rounded-full bg-white/90 shadow-lg 
                               hover:bg-white transition-all duration-300 
                               hover:scale-110 hover:shadow-[#1290ca]/20 
                               hover:shadow-lg hidden md:block">
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-[#052852]" />
              </button>
            )}
            renderNextButton={() => (
              <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                               p-2 md:p-3 rounded-full bg-white/90 shadow-lg 
                               hover:bg-white transition-all duration-300 
                               hover:scale-110 hover:shadow-[#1290ca]/20 
                               hover:shadow-lg hidden md:block">
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-[#052852]" />
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ValuesCarousel;
