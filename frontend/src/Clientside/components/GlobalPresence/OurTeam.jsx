import React, { useLayoutEffect, useRef } from 'react';
import Slider from 'react-slick';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import team1 from "../../../assets/team1.jpg"
import team2 from "../../../assets/team2.jpg"
import team3 from "../../../assets/team3.jpg"
gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { id: 1, name: "John Doe", role: "CEO", imageUrl: team1 },
  { id: 2, name: "Jane Smith", role: "CTO", imageUrl: team2},
  { id: 3, name: "Mike Johnson", role: "Lead Designer", imageUrl: team3},
  { id: 4, name: "Emily Brown", role: "Senior Developer", imageUrl: team1 },
  { id: 5, name: "Chris Lee", role: "Product Manager", imageUrl: team2 },
  { id: 6, name: "Sarah Davis", role: "Marketing Director", imageUrl: team3 },
];

const AnimatedTeamCarousel = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.team-card',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, dots: true } },
      { breakpoint: 1024, settings: { slidesToShow: 2, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 1, dots: true } },
    ],
  };

  return (
    <div className="py-16 w-[90%] mx-auto" ref={containerRef}>
      <h2 className="text-4xl text-center font-bold capitalize">
        Meet Our <span className="text-[#052852]">Team</span>
      </h2>
      <h3 className="text-xl text-center text-[#1290ca]/70 mt-4 mb-12">
        The People Behind Our Success
      </h3>

      <Slider {...settings}>
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card px-10">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 mb-4 rounded-full overflow-hidden shadow-lg shadow-[#1290ca] ">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover "
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AnimatedTeamCarousel;
