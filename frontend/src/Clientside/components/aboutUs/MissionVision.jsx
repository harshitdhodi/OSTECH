import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LightbulbIcon, Target } from 'lucide-react'; // Animated Icons
import backgroundImageUrl from '../../../assets/slider3.jpg'; // Your background asset

const MissionVisionSection = () => {
  const [missionData, setMissionData] = useState(null);
  const [visionData, setVisionData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const response = await axios.get('/api/mainMission/getAllMission');
        setMissionData(response.data.data);
      } catch (error) {
        console.error('Error fetching mission data:', error);
      }
    };

    const fetchVision = async () => {
      try {
        const response = await axios.get('/api/vision/getAllVision');
        setVisionData(response.data.data);
      } catch (error) {
        console.error('Error fetching vision data:', error);
      }
    };

    fetchMission();
    fetchVision();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('mission-vision-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      id="mission-vision-section"
      className="relative min-h-screen flex items-center justify-center py-16 lg:py-20"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#052852] bg-opacity-70 z-0"></div>

      <div className="max-w-7xl px-4 sm:px-0 sm:gap-2 gap-5 mx-auto grid grid-cols-1 lg:grid-cols-2 relative z-10">
        {/* Mission Section */}
        {missionData && (
          <>
            <div
              className={`bg-white p-8 lg:p-12 flex flex-col items-center text-center shadow-lg rounded-lg transition-all duration-1000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <LightbulbIcon className="w-10 h-10 text-blue-600 mb-4 animate-float" />
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-4">
                {missionData.title}
                <div className="h-1 w-16 lg:w-20 bg-blue-600 mx-auto mt-2"></div>
              </h2>
              <p
                className="text-gray-700 max-w-md"
                dangerouslySetInnerHTML={{ __html: missionData.description }}
              ></p>
            </div>

            <div
              className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-1000 delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{
                backgroundImage: `url(/api/image/download/${missionData.photo[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '46vh',
              }}
            ></div>
          </>
        )}

        {/* Vision Section */}
        {visionData && (
          <>
            <div
              className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-1000 delay-400 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{
                backgroundImage: `url(/api/image/download/${visionData.photo[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '40vh',
              }}
            ></div>

            <div
              className={`bg-white p-8 lg:p-12 flex flex-col items-center text-center shadow-lg rounded-lg transition-all duration-1000 delay-600 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <Target className="w-10 h-10 text-blue-600 mb-4 animate-pulse" />
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-4">
                {visionData.title}
                <div className="h-1 w-16 lg:w-20 bg-blue-600 mx-auto mt-2"></div>
              </h2>
              <p
                className="text-gray-700 max-w-md"
                dangerouslySetInnerHTML={{ __html: visionData.description }}
              ></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MissionVisionSection
// Add required animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`; // Correctly terminated template literal

document.head.appendChild(style);
