import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';

const Counter = () => {
    const [inView, setInView] = useState(false);
    const counterRef = useRef(null);

    const stats = [
        { number: "200", label: "Projects" },
        { number: "50", label: "Satisfied Clients" },
        { number: "30", label: "Years Experience" },
        { number: "80", label: "Workers" }
    ];

    useEffect(() => {
        // Intersection Observer to detect when the counter is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();  // Stop observing after the counter comes in view
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the counter is visible
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="flex justify-center w-full items-center py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="space-y-4 p-6 bg-white rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl" ref={counterRef}>
                        <p className="text-4xl font-bold text-blue-600 mb-2">
                            {inView ? (
                                <CountUp start={0} end={parseInt(stat.number)} duration={2} suffix="+" />
                            ) : (
                                `${stat.number}+`
                            )}
                        </p>
                        <p className="text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Counter;
