'use client'

import { Button, Card, CardContent } from "@mui/material"
import { Clipboard, PenTool, Wrench, Cog, Box, Truck, Zap, ClipboardCheck, FileText, Headphones } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useGetManufactureProcessesQuery } from "@/slice/ourProcess"

const steps = [
  // Your steps array as you provided, these could be dynamically replaced if needed
];

export default function PackagingMachineProcess() {
  const { data, isLoading, error } = useGetManufactureProcessesQuery();  // Fetch data from your API
  console.log(data)
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current && contentRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect();
        const { bottom } = contentRef.current.getBoundingClientRect();
        // Update logic to avoid conflicting behavior for small screens
        if (window.innerWidth >= 768) {  // Check if the screen is medium or larger
          setIsSticky(top <= 0 && bottom > window.innerHeight);
        } else {
          setIsSticky(false); // Disable sticky behavior for small screens
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading processes</div>;

  const stepsFromApi = Array.isArray(data?.data) ? data.data : [];  // Ensure data.data is an array

  return (
    <div className="bg-background flex justify-center items-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row" ref={stickyRef}>
        {/* Left sidebar */}
        <div className={`w-full md:w-1/3 lg:w-1/4 p-6 border-b md:border-r ${isSticky ? 'md:sticky top-0 md:pt-[8rem] self-start' : ''}`} style={{ height: isSticky ? '100vh' : 'auto' }}>
          <div className="space-y-6">
            <h1 className="text-3xl text-[#052852] font-bold leading-tight">
              Packaging Machine Design & Manufacturing Process
            </h1>
            <Link to='/contact-us'>
              <button className="w-fit border mt-3 p-2 px-5 rounded-md bg-[#1290ca] text-white" fullWidth>
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Right content */}
        <div className="w-full md:flex-1 p-6" ref={contentRef}>
          <div className="max-w-4xl space-y-8 pb-16">
            {stepsFromApi.length === 0 ? (
              <div>No manufacturing processes available</div>
            ) : (
              stepsFromApi.map((step, index) => (
                <Card key={index} variant="outlined" className="shadow-lg shadow-[#1290ca]/40 hover:shadow-lg hover:translate-y-[-3px] transform transition-all duration-300 hover:shadow-[#052852]/90">
                  <CardContent>
                    <div className="flex gap-4">
                      {step.icon}
                      <div className="space-y-3 space-x-5">
                        <h2 className="text-xl font-semibold">{step.title}</h2>
                        <div className="space-y-1 text-gray-600">
                          <p dangerouslySetInnerHTML={{ __html: step.description }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
