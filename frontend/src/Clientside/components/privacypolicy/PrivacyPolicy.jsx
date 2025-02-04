import React from 'react';
import Footer from '../home/Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-16 bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-gray-600 mb-6">
            At OSTECH, we prioritize the privacy of our users. This Privacy Policy outlines the types of information we collect and how it is used. Please read this policy carefully to understand our practices regarding your personal data.
          </p>

          <Section title="1. Information Collection">
            <p>We may collect personal information such as your name, email address, and contact details when you interact with our website or services. This information is collected through various means, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Account registration</li>
              <li>Newsletter subscriptions</li>
              <li>Contact forms</li>
              <li>Service usage</li>
            </ul>
          </Section>

          <Section title="2. Use of Information">
            <p>The information we collect is used for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To improve our services and user experience</li>
              <li>To provide customer support</li>
              <li>To fulfill your requests and process transactions</li>
              <li>To send periodic emails regarding our products or services</li>
              <li>To personalize your experience on our website</li>
            </ul>
          </Section>

          <Section title="3. Data Security">
            <p>We implement robust security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use of encryption for data transmission</li>
              <li>Regular security audits</li>
              <li>Access controls for our systems and databases</li>
            </ul>
            <p className="mt-2">However, please note that no method of transmission over the internet or electronic storage is 100% secure.</p>
          </Section>

          <Section title="4. Third-Party Sharing">
            <p>We do not sell, trade, or rent your personal information to third parties. We may share generic aggregated demographic information not linked to any personal identification information with our business partners, trusted affiliates, and advertisers.</p>
          </Section>

          <Section title="5. Cookies and Tracking Technologies">
            <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.</p>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Correct any inaccuracies in your data</li>
              <li>Request deletion of your data</li>
              <li>Object to the processing of your data</li>
              <li>Request the transfer of your data</li>
            </ul>
          </Section>

          <Section title="7. Changes to the Policy">
            <p>OSTECH reserves the right to update this Privacy Policy at any time. Users will be notified of significant changes through our website. We encourage you to periodically review this page for the latest information on our privacy practices.</p>
          </Section>

          <Section title="8. Contact Information">
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              OSTECH<br />
              Email: kamal.kaushik@ostech.in<br />
              Address:Factory Address: OSTECH Machines Pvt Ltd Plot no.121 Vibrant Business Park, GIDC, Vapi-396191, Gujarat
            </p>
          </Section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              By using OSTECH's services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">
              Last Updated: January 1, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

const Section = ({ title, children }) => (
  <>    
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed">{children}</div>
  </div>

  </>
);

export default PrivacyPolicy;

