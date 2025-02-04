import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductGridView = () => {
  const [gridItems, setGridItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await axios.get('/api/video/getLatestTwoVideos');
        const productResponse = await axios.get('/api/product/getProductsforGrid');
    
        const videoData = videoResponse.data.data || videoResponse.data || [];
        let videoItems = [];
        
        if (Array.isArray(videoData) && videoData.length > 0) {
          videoItems.push({
            id: 'video-0',
            type: 'video',
            src: videoData[0].youtubeId,
            alt: videoData[0].title,
            caption: videoData[0].caption || '',
            title: videoData[0].title,
            className: 'lg:col-span-2 lg:row-span-2 md:col-span-2 col-span-1',
            height: 'h-[400px]',
            order: 0,
            category: 'video',
          });
    
          if (videoData.length > 1) {
            videoItems.push({
              id: 'video-1',
              type: 'video',
              src: videoData[1].youtubeId,
              alt: videoData[1].title,
              caption: videoData[1].caption || '',
              title: videoData[1].title,
              className: 'lg:col-span-2 md:col-span-2 col-span-1',
              height: 'h-[300px]',
              order: 999,
              category: 'video',
            });
          }
        }
    
        const productData = productResponse.data.data || productResponse.data || [];
        const productItems = Array.isArray(productData)
          ? productData.map((product, index) => ({
              id: `product-${index}`,
              type: 'image',
              src: product.photo && product.photo[0] ? product.photo[0] : 'default_image_url.jpg',
              alt: product.title,
              caption: product.details || '',
              title: product.title,
              className: getProductClassName(index),
              height: getProductHeight(index),
              order: index + 1,
              category: product.category || 'default-category',
            }))
          : [];
    
        const allItems = [...videoItems, ...productItems].sort((a, b) => a.order - b.order);
        setGridItems(allItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const handleReadMore = (category, title) => {
    const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();
    navigate(`/${formattedTitle}`);
  };

  const getProductClassName = (index) => {
    const positions = [
      'lg:col-span-1 md:col-span-1 col-span-1',                    
      'lg:col-span-1 lg:row-span-2 md:col-span-1 col-span-1',      
      'lg:col-span-2 md:col-span-2 col-span-1',                    
      'lg:col-span-1 md:col-span-1 col-span-1',                    
    ];
    return positions[index % positions.length];
  };

  const getProductHeight = (index) => {
    const heights = [
      'h-[300px]',
      'h-[400px]',
      'h-[300px]',
      'h-[300px]',
    ];
    return heights[index % heights.length];
  };

  const handleMouseEnter = (id) => {
    setIsAnimating((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setIsAnimating((prev) => ({ ...prev, [id]: false }));
  };

  const renderGridItem = (item) => {
    const containerClasses = `relative w-full ${item.height} overflow-hidden rounded-lg`;
    
    if (item.type === 'video') {
      return (
        <div className={containerClasses}>
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src={`${item.src}`}
          />
          {/* <div className="absolute bottom-4 left-4 text-sm lg:text-lg text-white bg-[#052852]/50 px-3 py-1 rounded">
            {item.caption}
          </div> */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-2xl text-white font-semibold transition-all duration-500 ease-in-out transform ${
              isAnimating[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } bg-[#042852]/40`}
          >
            {item.title}
          </div>
        </div>
      );
    }  
  
    return (
      <div
        className={containerClasses}
        onClick={() => handleReadMore(item.category, item.title)}
      >
        <img
          src={`/api/image/download/${item.src}`}
          alt={item.alt}
          className="w-full h-full object-fill"
        />
        {/* <div className="absolute bottom-4 left-4 text-sm lg:text-lg text-white bg-[#052852]/50 px-3 py-1 rounded">
          {item.caption}
        </div> */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-2xl text-white font-semibold transition-all duration-500 ease-in-out transform ${
            isAnimating[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } bg-[#042852]/40`}
        >
          {item.title}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[98%] relative mx-auto px-4 py-8">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      ></div> 
      <div className="text-center sm:m-5 w-full mb-7  sm:mb-12">
        <h2 className="text-[#052852] font-bold text-3xl md:text-3xl lg:text-4xl">
          Our Products
        </h2>
        <p className='mt-1 sm:text-lg  text-gray-600'>Innovative Machinery Solutions Designed for Durability, Precision, and Maximum Efficiency</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 cursor-pointer lg:grid-cols-3 gap-6">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className={`relative transition-transform duration-300 hover:scale-[1.02] ${item.className}`}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
            {renderGridItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGridView;