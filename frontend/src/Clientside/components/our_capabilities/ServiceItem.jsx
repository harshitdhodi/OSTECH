import React from "react";

const ServiceItem = ({ title, description, imageSrc, isReversed = false }) => {
  const containerClasses = `flex flex-col md:flex-row  items-center   ${isReversed ? "md:flex-row-reverse" : ""
    }`;


  return (
    <div className={containerClasses}>
      <div className="w-full md:w-1/2 relative">

        <img
          src={imageSrc}
          alt={title}
          className="w-full h-1/2 object-cover rounded-lg shadow-lg shadow-[#1290caa6] relative z-10 transform transition-transform duration-300 hover:scale-95"
        />

      </div>
      <div className="w-full md:w-1/2 md:pl-10 p-2 py-5 md:py-0 md:p-5">
        <h3 className="text-2xl font-bold mb-4 text-[#052852]/90">Why {title}</h3>
        <p className="text-muted-foreground text-justify hover:text-[#1290ca]">{description}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
