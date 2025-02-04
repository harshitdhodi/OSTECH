import React from 'react';
import Footer from '../home/Footer';

const TermsAndConditions = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-4 sm:px-6  lg:px-8">
      <div className="max-w-4xl mx-auto bg-white mt-16 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Terms and Conditions</h1>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-gray-600 mb-6">
            Welcome to OSTECH. These Terms and Conditions govern your use of our website and services. By accessing or using OSTECH's services, you agree to be bound by these Terms. Please read them carefully.
          </p>

          <Section title="1. Acceptance of Terms">
            <p>By accessing or using OSTECH's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy.</p>
          </Section>

          <Section title="2. Use of Services">
            <p>You agree to use OSTECH's services only for lawful purposes and in accordance with these Terms. You are prohibited from:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing upon the rights of others</li>
              <li>Interfering with or disrupting OSTECH's services or servers</li>
              <li>Attempting to gain unauthorized access to any part of our services</li>
            </ul>
          </Section>

          <Section title="3. Intellectual Property Rights">
            <p>All content, designs, logos, and materials on this website are the intellectual property of OSTECH and are protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content from this site without express written permission from OSTECH.</p>
          </Section>

          <Section title="4. Limitation of Liability">
            <p>OSTECH and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, our services. This limitation applies to all claims, whether based on warranty, contract, tort, or any other legal theory.</p>
          </Section>

          <Section title="5. Modifications to Terms">
            <p>OSTECH reserves the right to modify these Terms and Conditions at any time. We will provide notice of significant changes by posting an announcement on our website. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.</p>
          </Section>

          <Section title="6. Governing Law and Jurisdiction">
            <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of Gujarat, India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Gujarat, India.</p>
          </Section>

          <Section title="7. Severability">
            <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable.</p>
          </Section>

          <Section title="8. Contact Information">
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
            <p className="mt-2">
              OSTECH<br />
              Email: kamal.kaushik@ostech.in<br />
              Address:Factory Address: OSTECH Machines Pvt Ltd Plot no.121 Vibrant Business Park, GIDC, Vapi-396191, Gujarat
            </p>
          </Section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              By using OSTECH's services, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.
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
  <div className="mb-6 ">
    <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed">{children}</div>
  </div>

  </>
);

  export default TermsAndConditions;

