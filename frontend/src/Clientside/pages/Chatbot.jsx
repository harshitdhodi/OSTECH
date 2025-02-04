import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Initialize Tawk_API
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();

    // Create and configure the script
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6777b3f849e2fd8dfe01f7b2/1iglpe1a8';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    // Insert the script before the first script tag in the document
    const s0 = document.getElementsByTagName("script")[0];
    s0.parentNode.insertBefore(s1, s0);

    return () => {
      // Cleanup: Remove the script when component unmounts
      if (s1.parentNode) {
        s1.parentNode.removeChild(s1);
      }
    };
  }, []);

  return <div id="chatbot-container" className=''></div>;
};

export default Chatbot;
