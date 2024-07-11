import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './BlogPost.css';
import { format, parseISO } from 'date-fns';
import { truncateText } from '../../utils/truncateUtils';

const BlogPost = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = post.created_at ? format(parseISO(post.created_at), 'MMMM d, yyyy') : 'Invalid Date';
  const maxLength = 250;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`blog-post ${isExpanded ? 'expanded' : ''}`} onClick={handleToggleExpand}>
      <div className="blog-post-content">
        <div className="blog-post-date">{formattedDate}</div>
        <h2>{post.title}</h2>
        <ReactMarkdown>{isExpanded ? post.content : truncateText(post.content, maxLength)}</ReactMarkdown>
        <div className="blog-post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="blog-post-tag">{tag}</span>
          ))}
        </div>
      </div>
      <img src={post.image} alt={post.title} className="blog-post-image" />
    </div>
  );
}

export default BlogPost;