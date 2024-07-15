import React from 'react';
import './PrivacyPage.css';

const PrivacyPage = () => {
  return (
    <div className="PrivacyPage">
      <main className="privacy-content">
        <h1>Privacy Policy</h1>
        <section>
          <h2>Introduction</h2>
          <p>
            At EcoBlocks, we are committed to protecting your privacy. This Privacy Policy outlines our data collection, processing, and usage practices.
          </p>
        </section>
        <section>
          <h2>Data Collection</h2>
          <p>
            We collect data to improve our services and provide a better user experience. The data we collect includes:
          </p>
          <ul>
            <li>Personal information such as name, email address, and contact details.</li>
            <li>Environmental data from IoT devices.</li>
            <li>Usage data and analytics from our website and app.</li>
          </ul>
        </section>
        <section>
          <h2>Data Usage</h2>
          <p>
            The collected data is used for the following purposes:
          </p>
          <ul>
            <li>Enhancing our services and developing new features.</li>
            <li>Providing personalized content and recommendations.</li>
            <li>Ensuring the security and integrity of our platform.</li>
          </ul>
        </section>
        <section>
          <h2>Data Security</h2>
          <p>
            We implement robust security measures to protect your data from unauthorized access and breaches. Our security practices include:
          </p>
          <ul>
            <li>Data encryption in transit and at rest.</li>
            <li>Access controls and authentication mechanisms.</li>
            <li>Regular security audits and vulnerability assessments.</li>
          </ul>
        </section>
        <section>
          <h2>Third-Party Services</h2>
          <p>
            We may share your data with trusted third-party service providers for the purpose of enhancing our services. These providers are bound by strict confidentiality agreements and data protection regulations.
          </p>
        </section>
        <section>
          <h2>Your Rights</h2>
          <p>
            You have the right to access, modify, and delete your personal data. You can exercise these rights by contacting our support team at support@ecoblocks.com.
          </p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact us at privacy@ecoblocks.com.
          </p>
        </section>
      </main>
    </div>
  );
}

export default PrivacyPage;
