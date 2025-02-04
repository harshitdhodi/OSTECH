import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WhyChooseUs() {
  const [offerings, setOfferings] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Fetch data from the API
    axios.get('/api/whyChooseUs/getAllWhyChooseUs')
      .then((response) => {
        // Process the fetched data
        const data = response.data.map((item) => ({
          icon: item.photo[0], // Assuming the first photo in the array is the icon
          title: item.title,
          description: item.description,
        }));
        setOfferings(data); // Update the offerings state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="ml-4">
      {/* above section  */}
      <section>
        <div className='flex flex-col justify-center items-start'>
          <div className='p-4'>
            <h2 className='text-3xl font-bold text-[#052852]'>Why Choose Us</h2>
          </div>

          <div className='max-w-5xl p-3 text-justify'>
            <p>Choose OSTECH for over 20 years of global expertise in machine building. With a foundation in quality workmanship from Gujarat, we prioritize teamwork, dedication, and excellence throughout our workflow. Our customer-centric approach ensures the design and construction of machinery that not only meets but exceeds industry standards, guaranteeing your satisfaction. Trust OSTECH for a reliable partner in delivering top-notch solutions.</p>
          </div>
        </div>
      </section>

      {/* bottom section  */}
      <section className="mb-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className={`bg-card shadow-lg hover:shadow-md hover:shadow-[#1290ca] shadow-[#1290ca]/50 p-6 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex justify-center">
                    <img src={`/api/image/download/${offering.icon}`} alt={offering.title} className='w-[30%]' />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{offering.title}</h3>
                  <p
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: offering.description }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
