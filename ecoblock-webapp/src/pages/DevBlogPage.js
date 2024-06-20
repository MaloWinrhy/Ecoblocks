import React, { useEffect, useState } from 'react';
import './DevBlogPage.css';
import BlogPost from '../components/blog/BlogPost';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getBlogPosts } from '../services/apiServices';

const DevBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]); // Initialiser avec un tableau vide

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogPosts();
        console.log('Fetched posts:', posts); // Log fetched posts
        setBlogPosts(posts); // Mettre à jour l'état avec les posts
      } catch (error) {
        console.error("Failed to fetch blog posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="devblog-page">
      <Header />
      <h1>Latest News</h1>
      <div className="blog-posts">
        {blogPosts.length > 0 ? (
          blogPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DevBlogPage;
