import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const AboutUs = () => {
    const [aboutData, setAboutData] = useState(null);
    const headingRef = useRef(null);
    const subheadingRef = useRef(null);  // New reference for subheading
    const location = useLocation();

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get('/api/aboutcompany/getAboutData');
                setAboutData(response.data.data);
            } catch (error) {
                console.error('Error fetching about company data:', error);
            }
        };

        fetchAboutData();
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (window.innerWidth > 640) {
            // Heading animation
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: -50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );

            // Subheading animation
            gsap.fromTo(
                subheadingRef.current,
                { opacity: 0, y: -50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: subheadingRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
        }

        if (location.pathname === '/about-us') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    if (!aboutData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="relative w-full bg-[#E6E6E6]  overflow-hidden">


            {/* Title and Description */}
            <div className="lg:flex justify-start w-[98%] mx-auto gap-10 items-start  px-6">
                <div ref={headingRef} className="mx-auto md:w-[95%] md:mt-8 w-[100%]">
                    {(location.pathname !== '/about-us') && (
                        <h3 className="text-3xl sm:text-4xl md:text-4xl pt-5 font-bold ml-1 mb-2 text-[#052852]">About Us</h3>
                    )}

                    {location.pathname !== '/about-us' && (
                        <p
                            ref={subheadingRef} // Apply the animation reference to subheading
                            className="lg:text-4xl md:text-lg    text-xl md:text-3xl font-bold text-[#1290ca] mb-4"
                        >
                            {/* {aboutData.title} */}
                        </p>
                    )}

                    <p
                        ref={subheadingRef} // Apply the animation reference to subheading
                        className="lg:text-4xl pt-10  sm:mt-0 text-xl md:text-3xl font-bold text-[#1290ca] mb-4"
                    >
                        {aboutData.title}
                    </p>

                    {location.pathname === '/' ? (
                        <div dangerouslySetInnerHTML={{ __html: aboutData.description }} className="text-gray-600 text-justify sm:text-xl text-sm" />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: aboutData.longDescription }}
                            className="text-gray-600 text-justify sm:text-xl text-sm max-w-[50rem]"
                        />
                    )}

                    {location.pathname !== '/about-us' && (
                        <Link to="/about-us">
                            <button className="bg-[#1290ca] mt-5 p-2 rounded text-white px-4 hover:border hover:bg-[#1290ca] hover:text-black text-lg transition-all duration-200">
                                Learn More
                            </button>
                        </Link>
                    )}
                </div>

                {/* Image Gallery Grid */}
                <div className="w-full px-4 sm:px-6 md:px-8 lg:w-[85%] xl:w-[75%] mx-auto py-6 sm:py-8 md:py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 h-auto sm:h-[400px] md:h-[500px] lg:h-[600px]">
                        {/* First Image */}
                        <div className="relative shadow-lg shadow-[#1290ca]/50 hover:shadow-lg hover:shadow-[#1290ca]/70 overflow-hidden rounded-lg group h-48 sm:h-full">
                            <img
                                src={`/api/image/download/${aboutData.photo[0]}`}
                                alt="Image 1"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = '/fallback-image.jpg';
                                }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                        </div>

                        {/* Second Image */}
                        <div className="relative shadow-lg shadow-[#1290ca]/50 hover:shadow-lg hover:shadow-[#1290ca]/70 overflow-hidden rounded-lg group h-48 sm:h-full">
                            <img
                                src={`/api/image/download/${aboutData.photo[1]}`}
                                alt="Image 2"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = '/fallback-image.jpg';
                                }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                        </div>

                        {/* Third Image (Spans 2 columns on larger screens) */}
                        <div className="relative shadow-lg shadow-[#1290ca]/50 hover:shadow-lg hover:shadow-[#1290ca]/70 overflow-hidden rounded-lg sm:col-span-2 group h-48 sm:h-[200px] md:h-[250px] lg:h-[300px]">
                            <img
                                src={`/api/image/download/${aboutData.photo[2]}`}
                                alt="Image 3"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = '/fallback-image.jpg';
                                }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AboutUs;
