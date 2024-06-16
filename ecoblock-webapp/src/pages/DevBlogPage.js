import React from 'react';
import './DevBlogPage.css';
import BlogPost from '../components/blog/BlogPost';

const DevBlogPage = () => {
  // Exemplz
  const blogPosts = [
    {
      id: 1,
      title: "Introduction to EcoBlocks",
      content: "Learn about the basics of EcoBlocks and how it integrates with web3 and IoT.",
      date: "June 16, 2024"
    },
    {
      id: 2,
      title: "Setting up the EcoBlocks API",
      content: "A guide to setting up the EcoBlocks API using Rust.",
      date: "June 17, 2024"
    }
  ];

  return (
    <div className="devblog-page">
      <h1>DevBlog</h1>
      <div className="blog-posts">
        {blogPosts.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default DevBlogPage;
