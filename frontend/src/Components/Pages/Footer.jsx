import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFooter = () => {
  const [newsletter, setNewsletter] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [googleLink, setGoogleLink] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNo_2, setPhoneNo_2] = useState("");
  const [email, setEmail] = useState("");
  const [email_2, setEmail_2] = useState("");
  const [address, setAddress] = useState(""); // New state for address
  const [officeTime, setOfficeTime] = useState(""); // New state for officeTime
  const navigate = useNavigate();

  useEffect(() => {
    fetchFooter();
  }, []);

  const notify = () => {
    toast.success("Updated Successfully!");
  };

  const fetchFooter = async () => {
    try {
      const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
      const footer = response.data;

      setNewsletter(footer.newsletter || "");
      setInstagramLink(footer.instagramLink || "");
      setFacebookLink(footer.facebookLink || "");
      setGoogleLink(footer.googleLink || "");
      setLocation(footer.location || "");
      setPhoneNo(footer.phoneNo || "");
      setPhoneNo_2(footer.phoneNo_2 || "");
      setEmail(footer.email || "");
      setEmail_2(footer.email_2 || "");
      setAddress(footer.address || ""); // Initialize address
      setOfficeTime(footer.officeTime || ""); // Initialize officeTime
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const footerData = {
        newsletter,
        instagramLink,
        facebookLink,
        googleLink,
        location,
        phoneNo,
        phoneNo_2,
        email,
        email_2,
        address, // Include address
        officeTime // Include officeTime
      };

      const response = await axios.put('/api/footer/updateFooter', footerData, { withCredentials: true });
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Footer Settings</h1>
      <ToastContainer/>
      <div className="mb-4">
        <label htmlFor="newsletter" className="block font-semibold mb-2">
          News Letter
        </label>
        <input
          type="text"
          id="newsletter"
          value={newsletter}
          onChange={(e) => setNewsletter(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="instagramLink" className="block font-semibold mb-2">
          Instagram Link
        </label>
        <input
          type="text"
          id="instagramLink"
          value={instagramLink}
          onChange={(e) => setInstagramLink(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="facebookLink" className="block font-semibold mb-2">
          Facebook Link
        </label>
        <input
          type="text"
          id="facebookLink"
          value={facebookLink}
          onChange={(e) => setFacebookLink(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="googleLink" className="block font-semibold mb-2">
         Youtub Links
        </label>
        <input
          type="text"
          id="googleLink"
          value={googleLink}
          onChange={(e) => setGoogleLink(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block font-semibold mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNo" className="block font-semibold mb-2">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNo_2" className="block font-semibold mb-2">
          Phone Number 2
        </label>
        <input
          type="text"
          id="phoneNo_2"
          value={phoneNo_2}
          onChange={(e) => setPhoneNo_2(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email_2" className="block font-semibold mb-2">
          Email 2
        </label>
        <input
          type="email"
          id="email_2"
          value={email_2}
          onChange={(e) => setEmail_2(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block font-semibold mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="officeTime" className="block font-semibold mb-2">
          Office Time
        </label>
        <input
          type="text"
          id="officeTime"
          value={officeTime}
          onChange={(e) => setOfficeTime(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditFooter;
