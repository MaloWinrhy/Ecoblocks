import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './DevBlogPage.css';
import BlogPost from '../components/blog/BlogPost';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getAllBlogPosts } from '../services/postsServices';

const DevBlogPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setAllPosts(posts);
        setTags(Array.from(new Set(posts.flatMap(post => post.tags))));
        setTotal(posts.length);
      } catch (error) {
        console.error("Failed to fetch blog posts", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = allPosts.filter(post =>
      (selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag))) &&
      (searchQuery === "" || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setTotal(filteredPosts.length);
    setDisplayedPosts(filteredPosts.slice((page - 1) * limit, page * limit));
  }, [allPosts, page, limit, selectedTags, searchQuery]);

  const handleTagChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedTags(selectedValues);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);

  const renderPageNumbers = () => {
    const maxPagesToShow = 10;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`page-number ${page === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const tagOptions = tags.map(tag => ({ value: tag, label: tag }));

  return (
    <div className="devblog-page">
      <Header />
      <h1>Latest News</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          className="tag-select"
          classNamePrefix="select"
          placeholder="Filter by tags"
          onChange={handleTagChange}
          value={tagOptions.filter(option => selectedTags.includes(option.value))}
        />
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
        {renderPageNumbers()}
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default DevBlogPage;
