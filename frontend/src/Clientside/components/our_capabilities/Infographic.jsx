import React from "react";
import { useGetInfographicsQuery } from "@/slice/infographic"; // Replace with your actual slice import
import {
  Monitor,
  Users,
  Hand,
  Layout,
  Palette,
  Computer,
  PencilRuler,
} from "lucide-react";
import { FaBridgeCircleExclamation } from "react-icons/fa6";
import { MdPrecisionManufacturing } from "react-icons/md";

// Step component for modularity
const Step = ({ icon, title, description, color }) => (
  <div className="relative flex items-start gap-6">
    <div
      className={`relative md:flex hidden hover:translate-y-[-3px] transform transition-all duration-300 z-10 w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shadow-[#1290ca]`}
    >
      <p>{icon}</p>
    </div>
    <div className="flex-1 pt-3 shadow-md hover:shadow-lg hover:translate-y-[-3px] transform transition-all duration-300 shadow-[#0b0f14]/30 hover:shadow-[#3a4b5f] p-6">
      <h3 className="text-[20px] font-semibold text-gray-900 mb-1">
        {title || "Title Missing"}
      </h3>
      <div
        className="text-gray-600 text-justify"
        dangerouslySetInnerHTML={{ __html: description || "Description Missing" }}
      ></div>
    </div>
  </div>
);


// Main Infographic component
export default function Infographic(headingPera) {
  const { data, isLoading, error } = useGetInfographicsQuery();

  // Static colors for the steps
  const staticColors = [
    "from-orange-400 to-yellow-400",
    "from-pink-400 to-purple-400",
    "from-purple-400 to-blue-400",
    "from-blue-400 to-teal-400",
    "from-yellow-400 to-green-400",
  ];

  // Extract the data array or fallback to an empty array
  const dataToDisplay = data?.data || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading infographics</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-7xl">
        <h3 className="md:text-center text-justify px-5 text-[15px] text-gray-900 leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: headingPera.headingPera }} />
        </h3>
      </div>
      <div className="max-w-7xl mx-auto md:mt-10 p-6 space-y-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
          {/* Steps */}
          <div className="space-y-12">
            {dataToDisplay.map((step, index) => (
              <Step
                key={step._id}
                icon={
                  <div className="w-8
                  rounded-full flex items-center justify-center">
                    <span className="
                    font-bold">
                      <img src={`/api/image/download/${step.photo}`} alt="" />
                    </span>
                  </div>
                }
                title={step.title}
                description={step.description}
                color={staticColors[index % staticColors.length]} // Cycle through colors
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
