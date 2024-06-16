import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './TermsPage.css';

const TermsPage = () => {
  return (
    <div className="TermsPage">
      <Header />
      <main className="terms-content">
        <h1>Terms & Conditions</h1>
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to EcoBlocks. By using our services, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </section>
        <section>
          <h2>Use of Services</h2>
          <p>
            Our services are designed to provide you with real-time environmental data. You agree to use our services in a manner consistent with all applicable laws and regulations.
          </p>
        </section>
        <section>
          <h2>User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
          </p>
        </section>
        <section>
          <h2>Prohibited Activities</h2>
          <p>
            You agree not to engage in any activities that could harm our platform or its users. Prohibited activities include, but are not limited to:
          </p>
          <ul>
            <li>Unauthorized access to our systems.</li>
            <li>Distributing malware or malicious software.</li>
            <li>Engaging in fraudulent or deceptive practices.</li>
          </ul>
        </section>
        <section>
          <h2>Intellectual Property</h2>
          <p>
            All content and materials on our platform are protected by intellectual property laws. You may not use our content without obtaining our prior written consent.
          </p>
        </section>
        <section>
          <h2>Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users of our services.
          </p>
        </section>
        <section>
          <h2>Limitation of Liability</h2>
          <p>
            EcoBlocks shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
          </p>
        </section>
        <section>
          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
          </p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at terms@ecoblocks.com.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default TermsPage;
