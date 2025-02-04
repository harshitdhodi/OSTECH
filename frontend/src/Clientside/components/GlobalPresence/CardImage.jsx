import React, { useState } from 'react';
import img1 from "../../../assets/slider5.jpg"
import img2 from "../../../assets/slider4.jpg"
import img3 from "../../../assets/manufacture1.jpg"
import img4 from "../../../assets/manufacture2.jpg"
const imageData = [
  {
    id: 1,
    name: "Mountain Landscape",
    image: img1,
    description: "A breathtaking view of snow-capped mountains and misty valleys.",
    details: "Location: Swiss Alps, Captured: Summer 2023"
  },
  {
    id: 2,
    name: "Urban Sunset",
    image: img2,
    description: "Cityscape with vibrant orange and pink sunset hues.",
    details: "City: Tokyo, Photographer: John Doe"
  },
  {
    id: 3,
    name: "Tropical Beach",
    image: img3,
    description: "Pristine white sand beach with crystal clear turquoise waters.",
    details: "Island: Maldives, Best Time to Visit: December-April"
  },
  {
    id: 4,
    name: "Forest Pathway",
    image: img4,
    description: "Serene forest path lined with ancient trees and soft moss.",
    details: "Forest Type: Temperate Rainforest, Location: Pacific Northwest"
  }
];

const ImageGrid = () => {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {imageData.map((item) => (
          <div 
            key={item.id} 
            className="relative group  overflow-hidden rounded-lg shadow-[#1290ca] shadow-md"
            onMouseEnter={() => setHoveredImage(item.id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {/* Image */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-[80vh] object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Image Details */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white">
              <h3 className="text-lg font-bold">{item.name}</h3>
            </div>
            
            {/* Hover Details with Bottom-to-Top Animation */}
            {hoveredImage === item.id && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-center p-4 
                animate-slide-up"
              >
                <div className="transform translate-y-0 opacity-100 transition-all duration-500">
                  <p className="text-white mb-2 text-lg">{item.description}</p>
                  <p className="text-gray-300 italic text-md">{item.details}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;