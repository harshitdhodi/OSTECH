import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [footerData, setFooterData] = useState(null);
    const [clientIp, setClientIp] = useState('');
    const [utmParams, setUtmParams] = useState({});

    // Fetch footer data
    useEffect(() => {
        axios.get('/api/footer/getAllFooter')
            .then(response => setFooterData(response.data))
            .catch(error => console.error('Error fetching footer data:', error));
    }, []);

    // Fetch client IP and UTM parameters
    useEffect(() => {
        const fetchClientIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setClientIp(response.data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        fetchClientIp();

        const params = new URLSearchParams(window.location.search);
        setUtmParams({
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_id: params.get('utm_id') || '',
            gclid: params.get('gclid') || '',
            gcid_source: params.get('gcid_source') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || '',
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/inquiries/createInquiry', {
                name,
                email,
                phone,
                message,
                clientIp,
                utmParams
            });
            setModalIsOpen(true);
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
    };

    const handlePhoneClick = () => {
        if (footerData && footerData.phoneNo) {
            window.location.href = `tel:${footerData.phoneNo}`;
        }
    };

    const handleEmailClick = (emailAddress) => {
        if (emailAddress) {
            window.location.href = `mailto:${emailAddress}`;
        }
    };

    const handleAddressClick = () => {
        if (footerData && footerData.address) {
            const encodedAddress = encodeURIComponent(footerData.address);
            window.open(`https://www.google.com/maps?q=${encodedAddress}`, '_blank');
        }
    };
    return (
        <>
            {/* Contact Form */}
            <div className='lg:flex gap-5 lg:px-10 bg-[#1290ca]/10 py-16'>
                <div className='flex justify-center items-center bg-white shadow-lg rounded-lg text-center pb-10 w-full font-nunito'>
                    <div className="p-4 w-3/4 lg:w-full">
                        <form className='md:p-10' onSubmit={handleSubmit}>
                            <div className='text-start py-5'>
                                <p className=' text-[#1290ca]/70 font-medium text-xl'>Have Questions</p>
                                <p className='text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl xl:text-3xl'>Send us a message</p>
                            </div>
                            <div className="mb-4 w-full">
                                <input
                                    className="bg-gray-100 border rounded w-full py-3 lg:py-4 px-3 text-gray-700 focus:outline-black focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Name*"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='md:flex gap-8'>
                                <div className="mb-4 md:w-1/2">
                                    <input
                                        className="bg-gray-100 border rounded w-full py-3 px-3 lg:py-4 text-gray-700 focus:outline-black focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4 md:w-1/2">
                                    <input
                                        className="bg-gray-100 border rounded w-full py-3 px-3 lg:py-4 text-gray-700 focus:outline-black focus:shadow-outline"
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <textarea
                                    className="bg-gray-100 border rounded w-full py-3 pb-10 px-3 text-gray-700 focus:outline-black focus:shadow-outline"
                                    id="message"
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-start">
                                <button
                                    className="bg-[#1290ca]/90 hover:bg-[#1290ca] w-full flex justify-center gap-2 items-center text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    <FaPaperPlane />
                                    Get in Touch
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Details */}
                {footerData && (
                <div className='space-y-4 px-10 pb-10 py-5 bg-white shadow-lg rounded-lg lg:w-1/2'>
                    <div className='space-y-5'>
                        <p className='xl:text-4xl lg:text-3xl font-bold md:text-4xl text-3xl text-[#1290ca]'>Contact Details</p>
                        <p className='text-gray-600 font-semibold'>Get in touch with us for any questions about our industries or projects.</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold text-[#1290ca]/90 mb-1'>Office :</p>
                        <p 
                            className='text-gray-600 font-semibold cursor-pointer hover:text-[#1290ca]' 
                            onClick={handleAddressClick}
                        >
                            {footerData.address}
                        </p>
                    </div>
                    <div>
                        <p className='text-xl font-bold text-[#1290ca]/90 mb-1'>Email us :</p>
                        <p className='text-gray-600 font-semibold'>
                            <span 
                                className="cursor-pointer hover:text-[#1290ca]"
                                onClick={() => handleEmailClick(footerData.email)}
                            >
                                {footerData.email}
                            </span>
                            <br />
                            <span 
                                className="cursor-pointer hover:text-[#1290ca]"
                                onClick={() => handleEmailClick(footerData.email_2)}
                            >
                                {footerData.email_2}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className='text-xl font-bold text-[#1290ca]/90 mb-1'>Call Support :</p>
                        <p 
                            className='text-gray-600 font-semibold cursor-pointer hover:text-[#1290ca]' 
                            onClick={handlePhoneClick}
                        >
                            {footerData.phoneNo}
                        </p>
                    </div>
                </div>
            )}
            </div>

            {/* Google Map */}
            {footerData && (
                <div className='px-10 bg-[#1290ca]/10 pb-7'>
                    <iframe
                        src={footerData.location}
                        height="450"
                        className='border-0 w-full'
                        allowFullScreen="true"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            )}

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Submission Successful"
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-[#f5faf7ed] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Thank you for contacting us!</h2>
                    <p className="text-gray-600 mb-6">We have received your inquiry and will get back to you as soon as possible.</p>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    >
                        <FaTimes />
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ContactForm;
