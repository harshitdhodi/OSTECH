import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import WhatsApp from '../pages/Whatsapp';

const WhatsAppButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('jwt');
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      console.log("User is not logged in");
    }
  }, []);

  // List of routes where WhatsAppButton should be hidden
  const hideWhatsAppIconRoutes = [
    "/privacy-policy",
    "/terms-and-conditions",
    "/login",
    "/signup",
    "/resetpassword",
    "/verifyOTP",
    "/forgetpassword",
  ];

  // Check if the current route matches any in the list
  const hideWhatsAppIcon = hideWhatsAppIconRoutes.includes(location.pathname);

  return (
    <div >
      {/* Your other component logic */}

      {!hideWhatsAppIcon && <WhatsApp />}
    </div>
  );
  }; 


export default WhatsAppButton;
