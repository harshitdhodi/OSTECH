import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const OurClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');

  const clientImagesRef = useRef([]);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    const fetchPageHeadings = async () => {
      try {
        const response = await axios.get('/api/pageHeading/heading?pageType=partner');
        const { heading, subheading } = response.data;
        setHeading(heading || 'Our Clients');
        setSubheading(subheading || 'Here are some of our valued clients');
      } catch (error) {
        console.error('Error fetching page headings:', error);
        setHeading('Our Clients');
        setSubheading('Here are some of our valued clients');
      }
    };

    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/partner/getAllpartners');
        const data = response.data.data.map((item) => ({
          id: item._id,
          title: item.imgtitle.length > 0 ? item.imgtitle[0] : item.partnerName,
          url: `/api/image/download/${item.photo[0]}`,
          alt: item.alt[0] || item.partnerName,
        }));
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageHeadings();
    fetchClients();
  }, []);

  useEffect(() => {
    // Animation for client images using GSAP ScrollTrigger
    clientImagesRef.current.forEach((image, index) => {
      gsap.fromTo(
        image,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
            markers: false,
          },
        }
      );
    });

    // Animation for heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
          markers: false,
        },
      }
    );

    // Animation for subheading
    gsap.fromTo(
      subheadingRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
          markers: false,
        },
      }
    );
  }, [clients]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: true, // Center the active slide
    centerPadding: '0px', // Remove padding around centered slide
  };

  return (
    <div className=" px-5 pt-3 pb-8 bg-blue-100">
      <div className="md:flex flex-col justify-center mt-12 items-center mb-10">
        <h2
          ref={headingRef}
          className="lg:text-4xl md:text-3xl text-[#052852] text-2xl text-center font-bold"
        >
          {heading}
        </h2>
        <p
          ref={subheadingRef}
          className="sm:w-[80%] w-full text-center lg:text-lg mt-1 text-lg text-gray-900"
        >
          {subheading}
        </p>
      </div>

      <div className="w-full mb-10 hidden md:block mx-auto p-2">
        <div className="slider-container">
          <div className="slider">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                ref={(el) => (clientImagesRef.current[index] = el)} // Attach ref to each client image
                className="client-image relative flex justify-center items-center overflow-hidden rounded-lg"
              >
                <img
                  src={client.url}
                  alt={client.alt}
                  className="w-full lg:w-4/5 h-full object-contain lg:p-1"
                  onError={(e) => {
                    e.target.src = `/images/placeholder.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex justify-center items-center">
                  <h3 className="text-white font-medium text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {client.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block md:hidden mb-8 -mt-8 w-full">
        <Slider {...slickSettings}>
          {clients.map((client) => (
            <div key={client.id} className="w-full h-[80px] px-2 flex justify-center items-center">
              <img
                src={client.url}
                alt={client.alt}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = `/images/placeholder.jpg`;
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurClientsPage;
