import React from 'react';
import ReactMarkdown from 'react-markdown';
import './BlogPost.css';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils';

const BlogPost = ({ post }) => {
  const formattedDate = post.created_at ? format(parseISO(post.created_at), 'MMMM d, yyyy') : 'Invalid Date';
  const maxLength = 150;

  return (
    <div className="blog-post">
      <div className="blog-post-content">
        <div className="blog-post-date">{formattedDate}</div>
        <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
        <ReactMarkdown>{truncateText(post.content, maxLength)}</ReactMarkdown>
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
