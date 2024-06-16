import React from 'react';
import './DevBlogPage.css';
import BlogPost from '../components/blog/BlogPost';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';


const DevBlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Ecoblock Partners with Massive to Allow Nearly Half a Million Active Ecoblock Users to Participate in the AI Economy",
      content: "Ecoblock is entering a strategic partnership with Massive, a 100% opt-in peer-to-peer network designed to unlock the public web...",
      date: "13 JUN",
      image: "https://via.placeholder.com/300",
      tags: ["ECOBLOCK NETWORK", "ECOBLOCK APP"]
    },
    {
      id: 2,
      title: "Ecoblock Partners with Hayden AI to Enhance Data Security",
      content: "Ecoblock will work with Hayden AI to explore opportunities to deploy its ContentSign authentication technology...",
      date: "21 MAY",
      image: "https://via.placeholder.com/300",
      tags: ["AI", "BLOCKCHAIN"]
    }
    // Ajoutez plus d'articles ici
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
