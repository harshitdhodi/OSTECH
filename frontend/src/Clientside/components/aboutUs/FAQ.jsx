import { useState, useEffect } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import IMG from "../../../assets/about5.jpg" // Default image for fallback
import WhatWeOffer from './WhatWeOffer'
import axios from 'axios'

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]) // Store FAQ data
  const [openIndex, setOpenIndex] = useState(null)
  const [mission, setMission] = useState(null); // Store mission data

  // Fetch FAQ data
  useEffect(() => {
    axios.get('/api/faq/getAllFAQ')
      .then(response => {
        setFaqs(response.data.data); // Set FAQ data
      })
      .catch(error => {
        console.error("Error fetching FAQ data:", error)
      })
  }, []);

  // Fetch mission data
  useEffect(() => {
    axios.get('/api/mission/getAllMission')
      .then(response => {
        console.log(response.data.data)
        if (response.data && response.data.data) {
          setMission(response.data.data); // Set mission data (taking the first mission)
        }
      })
      .catch(error => {
        console.error("Error fetching mission data:", error);
      });
  }, []);

  // Toggle FAQ visibility
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gray-50 py-12 relative ">
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-3xl text-justify font-bold text-gray-900 mb-4">
                {mission ? mission.title : 'Loading mission title...'}
              </h2>
              <p className="sm:text-xl text-lg text-justify text-gray-600 mx-auto">
                {mission ? (
                  <div dangerouslySetInnerHTML={{ __html: mission.description }} />
                ) : (
                  'Loading mission description...'
                )}
              </p>
            </div>

            {/* FAQs */}
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div key={faq._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    className="w-full text-left p-4 focus:outline-none"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      <ChevronDownIcon
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          openIndex === index ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4">
                      <div
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">Loading FAQs...</p>
            )}
          </div>

          {/* Right Section (Image) */}
          <div className="mt-8 flex items-center justify-center relative top-10 md:mt-0">
            {mission && mission.photo && mission.photo.length > 0 ? (
              <img
                src={`/api/image/download/${mission.photo[0]}`} // Assuming your images are served from a public directory
                alt="Mission Image"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            ) : (
              <img
                src="" // Fallback image if no mission photo exists
                alt="Mission Illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </div>

      {/* Additional Component */}
      <WhatWeOffer />
    </section>
  );
}
