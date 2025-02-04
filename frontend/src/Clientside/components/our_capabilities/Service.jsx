import React from "react";
// import {  } from "../../../features/yourSlice";
import ServiceItem from "./ServiceItem";
import { useGetOurcapabilityServicesQuery } from "@/slice/ourCapabilityService";

const BASE_IMAGE_URL = "/api/image/download"; // Update this to match your image hosting URL

const Services = () => {
  const { data, isLoading, isError } = useGetOurcapabilityServicesQuery();

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load services. Please try again later.</p>;
  }

  if (!data?.success || !data?.data?.length) {
    return <p className="text-center text-gray-500">No services available at the moment.</p>;
  }

  const services = data.data;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="lg:text-4xl md:text-3xl text-3xl font-bold text-center text-[#052852] mb-1">
          Our Services
        </h2>
        <p className="text-center mb-12 text-gray-500">
          Precision in Every Build, Power in Every Machine
        </p>
        <div>
          {services.map((service, index) => (
            <ServiceItem
              key={service._id}
              title={service.title}
              description={service.description}
              imageSrc={`${BASE_IMAGE_URL}/${service.photo}`}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
