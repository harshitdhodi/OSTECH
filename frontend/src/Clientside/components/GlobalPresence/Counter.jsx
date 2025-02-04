import { useEffect, useState, useRef } from 'react';

export default function MetricsDisplay() {
    const [customersCount, setCustomersCount] = useState(0);
    const [capacityCount, setCapacityCount] = useState(0);
    const [startCounting, setStartCounting] = useState(false);

    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCounting(true);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!startCounting) return;

        // Counter for Happy Customers
        const customersInterval = setInterval(() => {
            setCustomersCount(prev => (prev < 500 ? prev + 10 : 500));
        }, 30);

        // Counter for Production Capacity
        const capacityInterval = setInterval(() => {
            setCapacityCount(prev => (prev < 400 ? prev + 5 : 400));
        }, 30);

        return () => {
            clearInterval(customersInterval);
            clearInterval(capacityInterval);
        };
    }, [startCounting]);

    return (
        <div ref={sectionRef} className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left side - Description */}
                <div className="md:w-1/2">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-justify sm:text-left text-[#1290ca] leading-tight">
                        Our strength lies in our unwavering commitment to quality, innovation, and customer satisfaction.
                    </h2>
                </div>

                {/* Right side - Metrics */}
                <div className="md:w-1/2">
                    <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                        {/* Happy Customers Metric Card */}
                        <div className="text-center bg-white p-6 rounded-lg shadow-md shadow-[#1290ca] transform transition hover:scale-105">
                            <div className="relative inline-block">
                                <span className="text-5xl md:text-6xl lg:text-5xl font-bold text-[#052852]">
                                    {customersCount}
                                    <span className="text-[#052852]">+</span>
                                </span>
                            </div>
                            <p className="mt-2 text-[#052852]/60 text-lg">Happy Customers</p>
                        </div>

                        {/* Production Capacity Metric Card */}
                        <div className="text-center bg-white p-6 rounded-lg shadow-md shadow-[#1290ca] transform transition hover:scale-105">
                            <div className="text-5xl md:text-4xl lg:text-5xl font-bold text-[#052852]">
                                {capacityCount}MT
                            </div>
                            <p className="mt-2 text-[#052852]/60 text-lg">Production Capacity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
