import React from 'react';
import './DevBlogPage.css';
import BlogPost from '../components/blog/BlogPost';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';


const DevBlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "EcoBlock Website Development Begins!",
      content: "We are excited to announce the start of development for the EcoBlock website. This platform will serve as the central hub for all information related to our innovative solutions in blockchain and sustainability. The website will provide comprehensive details about our mission, vision, and the various projects we are working on to promote environmental sustainability through cutting-edge technology. Stay tuned for regular updates as we progress through the different stages of development. Our team is dedicated to creating a user-friendly and informative platform that will engage and educate our community.",
      date: "13 JUN",
      image: "https://via.placeholder.com/300",
      tags: ["ECOBLOCK", "WEBSITE DEVELOPMENT"]
    },
    {
      id: 2,
      title: "Key Features of the Upcoming EcoBlock Website",
      content: "Our new website will feature a detailed overview of our projects, a blog section for the latest news and updates, and a dedicated area for developers to access our API documentation. The project overview will include in-depth information about how EcoBlock uses blockchain technology to ensure the transparency and integrity of environmental data. The blog will serve as a hub for all the latest updates, including partnership announcements, feature releases, and insights from our team. Developers will find comprehensive API documentation, code samples, and tutorials to help them integrate their applications with our platform. We are committed to making this platform both informative and user-friendly, ensuring that all visitors have a seamless experience.",
      date: "21 MAY",
      image: "https://via.placeholder.com/300",
      tags: ["FEATURES", "WEBSITE"]
    },
    {
      id: 3,
      title: "EcoBlock's Vision and Mission",
      content: "At EcoBlock, our mission is to leverage blockchain technology to create sustainable solutions for the environment. We believe that transparency and accountability are crucial in the fight against climate change. Our vision is to empower communities to track and reduce their carbon footprint through transparent and secure data management. By providing a platform that combines the power of blockchain and IoT, we aim to deliver accurate and actionable environmental data. Our ultimate goal is to create a global network of environmentally conscious individuals and organizations working together to promote sustainability. Through our efforts, we hope to make a significant impact on the health of our planet and contribute to a more sustainable future.",
      date: "5 APR",
      image: "https://via.placeholder.com/300",
      tags: ["VISION", "MISSION"]
    },
    {
      id: 4,
      title: "Meet the EcoBlock Development Team",
      content: "Our development team is composed of talented professionals passionate about technology and sustainability. Our team members bring a diverse range of skills and expertise to the table, from software development and blockchain technology to environmental science and project management. We are united by a common goal: to build a platform that not only meets the needs of our users but also promotes a greener future. Each member of our team is dedicated to creating innovative solutions that drive positive change. We are working tirelessly to ensure that the EcoBlock website is a robust, secure, and user-friendly platform that provides valuable insights and tools for our community.",
      date: "15 MAR",
      image: "https://via.placeholder.com/300",
      tags: ["TEAM", "DEVELOPMENT"]
    },
    {
      id: 5,
      title: "EcoBlock Website: Technologies We Use",
      content: "Our website is being built using modern technologies like React for the frontend, Rust for the backend, and PostgreSQL for our database. React allows us to create dynamic and responsive user interfaces that provide a seamless experience across all devices. Rust, known for its performance and security, ensures that our backend systems are robust and efficient. PostgreSQL, a powerful relational database system, provides the reliable data storage and management capabilities we need. These choices ensure a fast, secure, and scalable platform for our users. By leveraging these technologies, we aim to deliver a high-quality website that meets the needs of our growing community and supports our mission of promoting environmental sustainability.",
      date: "10 FEB",
      image: "https://via.placeholder.com/300",
      tags: ["TECHNOLOGY", "STACK"]
    }
  ];

  return (
    <div className="devblog-page">
      <Header />
      <h1>Latest News</h1>
      <div className="blog-posts">
        {blogPosts.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DevBlogPage;
