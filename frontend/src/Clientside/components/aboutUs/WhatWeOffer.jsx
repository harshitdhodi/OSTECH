import { useEffect, useState } from "react";
import { Factory } from "lucide-react";

// Importing default images for fallback
import flip1 from "../../../assets/flip1.jpg";

export default function WhatWeOffer() {
  const [offerings, setOfferings] = useState([]);

  // Fetching the data from the API
  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const response = await fetch("/api/benefits/getAllBenefits");
        const data = await response.json();

        // Mapping API response to the structure you need
        const mappedOfferings = data.map((item) => ({
          icon: <Factory className="w-12 h-12 text-primary" />, // Default icon, adjust if needed
          title: item.title,
          description: item.description,
          image:
            item.photo && item.photo.length > 0
              ? `/api/image/download/${item.photo[0]}`
              : flip1, // Fallback to flip1 if no image
        }));

        setOfferings(mappedOfferings);
      } catch (error) {
        console.error("Error fetching offerings:", error);
      }
    };

    fetchOfferings();
  }, []);

  return (
    <section className="bg-gray-50 mt-10 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {offerings.slice(0, 3).map((offering, index) => (
            <div
              key={index}
              className="perspective-1000 group"
            >
              <div className="relative w-full h-56 transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                {/* Front side */}
                <div 
                  className="absolute inset-0 bg-cover bg-center rounded-lg backface-hidden z-10 flex items-center justify-center"
                  style={{ backgroundImage: `url(${offering.image})` }}
                >
                  {/* Overlay Title */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-center text-white sm:text-2xl">
                      {offering.title}
                    </h3>
                  </div>
                </div>

                {/* Back side */}
                <div 
                  className="absolute inset-0 bg-gray-800 rounded-lg transform rotate-y-180 backface-hidden flex flex-col justify-center items-center p-6"
                >
                  <h3 className="text-xl font-semibold text-center text-white mb-4 sm:text-2xl">
                    {offering.title}
                  </h3>
                  <p
                    className="text-white text-sm text-center sm:text-base"
                    dangerouslySetInnerHTML={{ __html: offering.description }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}