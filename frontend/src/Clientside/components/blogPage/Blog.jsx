import React from 'react';


import { CalendarIcon, ClockIcon, ArrowRightIcon, PhoneIcon, MailIcon } from "lucide-react";
import hero1 from "../../../assets/slider3.jpg"
import hero2 from "../../../assets/slider1.jpg"
import hero3 from "../../../assets/slider4.jpg"
import hero4 from "../../../assets/slider2.jpg"
// Mock recent posts data
const recentPosts = [
    {
        title: "10 Essential CSS Tricks Every Developer Should Know",
        excerpt:
            "Improve your CSS skills with these powerful techniques that can enhance your web designs and streamline your workflow.",
        date: "May 28, 2024",
        img: hero1,
    },
    {
        title: "Building Scalable APIs with GraphQL and Node.js",
        excerpt:
            "Learn how to create efficient and flexible APIs using GraphQL and Node.js, and why it might be the right choice for your next project.",
        date: "May 25, 2024",
        img: hero2,
    },
    {
        title: "The Art of Code Review: Best Practices for Teams",
        excerpt:
            "Discover how to conduct effective code reviews that improve code quality, foster collaboration, and enhance team productivity.",
        date: "May 22, 2024",
        img: hero3,
    },
];

export default function Blog() {
    return (
        <div className=" px-4 md:px-6 mb-10 bg-white lg:px-8 relative">

            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px'
                }}
            ></div>
            <div className="max-w-7xl mx-auto">
                <div className="lg:flex lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl text-[#052852] font-bold mb-8">Latest from the Blog</h2>

                        {/* Featured Post */}
                        <div className="bg-white transform transition-transform duration-100 hover:scale-105 hover:shadow-md hover:shadow-[#1290ca]hover:scale-105 shadow-lg hover:shadow-[#1290ca] shadow-[#1290ca]/50 rounded-lg h-[50vh] border border-gray-200 mb-12 overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-2/5 p-5 lg:w-[80%] h-[50vh]">
                                    <img
                                        src={hero4}
                                        alt="Featured blog post img"
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                    />
                                </div>
                                <div className="md:w-3/5 h-[50vh] p-4">
                                    <div className="card-header">
                                        <h3 className="card-title text-2xl font-bold mb-2 text-gray-800">
                                            <a href="#" className="hover:underline text-[#052852]">
                                                The Future of Web Development: Trends to Watch in 2024
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="card-content">
                                        <p className="text-gray-600 mb-4">
                                            Explore the cutting-edge technologies and methodologies that are shaping the future of web
                                            development. From AI-driven interfaces to advanced frontend frameworks, discover what's next in the
                                            world of web tech.
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            <span>June 1, 2024</span>
                                            <ClockIcon className="ml-4 mr-2 h-4 w-4" />
                                            <span>8 min read</span>
                                        </div>
                                    </div>
                                    <div className="card-footer ">
                                        <button className="btn bg-[#1290ca] text-white hover:bg-[#1299ca] px-8 py-2 rounded">
                                            Read More

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <h3 className="text-2xl text-[#052852] font-bold mb-6">Recent Posts</h3>
                        <div className="grid gap-6 md:grid-cols-2 ">
                            {recentPosts.map((post, index) => (
                             <div
                             key={index}
                             className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-md hover:shadow-[#1290ca] shadow-[#1290ca]/50 rounded-lg border border-gray-200 overflow-hidden"
                           >
                             <img
                               src={post.img}
                               alt={`${post.title} cover img`}
                               width={400}
                               height={200}
                               className="w-full h-48 object-cover rounded-t-lg transition-opacity duration-300 hover:opacity-90"
                             />
                             <div className="card-header p-4">
                               <h3 className="card-title text-xl font-bold text-gray-800">
                                 <a href="#" className="hover:underline hover:text-[#1290ca] transition-colors duration-300">
                                   {post.title}
                                 </a>
                               </h3>
                             </div>
                             <div className="card-content p-4">
                               <p className="text-gray-600 mb-4">{post.excerpt}</p>
                               <div className="flex items-center text-sm text-gray-500">
                                 <CalendarIcon className="mr-2 h-4 w-4" />
                                 <span>{post.date}</span>
                               </div>
                             </div>
                             <div className="card-footer p-4 cursor-pointer">
                               <button className="btn bg-[#1290ca] text-white hover:bg-[#1299ca] px-8 py-2 rounded">
                                 Read More
                               </button>
                             </div>
                           </div>
                           
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 mt-8 lg:mt-10">
                        {/* Share Your Thoughts Card */}
                        <div className="sticky top-24 mb-8 p-7">
                            <div className="bg-[#052852] py-10 px-5 shadow-lg hover:shadow-md hover:shadow-[#052852] shadow-[#052852]/50  border  border-gray-200">
                                <div className="card-header p-4">
                                    <h3 className="card-title text-3xl text-white font-bold">
                                        Connect with Us for Custom Solutions</h3>
                                </div>
                                <div className="px-4 pb-4">
                                    <p className="mb-4 text-lg text-gray-400">
                                        Submit Your Inquiry Below to Explore Tailored Industrial Products for Your Business
                                    </p>
                                    <button className="btn bg-[#ffffff] text-[052852]  w-1/2 py-2 rounded">
                                        Get Inquiry
                                    </button>
                                </div>
                            </div>
                            {/* Contact Card */}
                            <div className="mt-5 ">
                                <div className="bg-[#052852] flex flex-col gap-4 shadow-lg hover:shadow-md hover:shadow-[#052852] shadow-[#052852]/50  border border-gray-200 p-10 ">
                                    <div className="card-header">
                                        <h3 className="card-title text-2xl font-bold text-[#ffffff]">Get in Touch</h3>
                                    </div>
                                    <div className="card-content flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <PhoneIcon className="h-6 w-6 mr-2 text-[#ffffff]" />
                                            <span className="text-lg text-[#ffffff]">+1 (555) 123-4567</span>
                                        </div>
                                        <div className="flex items-center ">
                                            <MailIcon className="h-6 text-[#ffffff] w-6 mr-2" />
                                            <a href="mailto:contact@example.com" className="text-lg text-[#ffffff] hover:underline">
                                                contact@example.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>

    );
}
