import React, { useEffect, useState } from 'react';
import './DevBlogPage.css';
import BlogPost from '../components/blog/BlogPost';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getAllBlogPosts } from '../services/postsServices';

const DevBlogPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit of 10 per page
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState([]); // Set available tags
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setAllPosts(posts);
        setTags(Array.from(new Set(posts.flatMap(post => post.tags)))); // Extract unique tags
        setTotal(posts.length);
      } catch (error) {
        console.error("Failed to fetch blog posts", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = selectedTags.length > 0
      ? allPosts.filter(post => selectedTags.every(tag => post.tags.includes(tag)))
      : allPosts;

    setTotal(filteredPosts.length);
    setDisplayedPosts(filteredPosts.slice((page - 1) * limit, page * limit));
  }, [allPosts, page, limit, selectedTags]);

  const handleTagChange = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setPage(1); // Reset to first page on filter change
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="devblog-page">
      <Header />
      <h1>Latest News</h1>
      <div className="filters">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagChange(tag)}
            className={selectedTags.includes(tag) ? 'selected' : ''}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="blog-posts">
        {displayedPosts.length > 0 ? (
          displayedPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default DevBlogPage;
