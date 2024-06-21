import React from 'react';
import './BlogPost.css';
import { format, parseISO } from 'date-fns';

const BlogPost = ({ post }) => {
  const formattedDate = post.created_at ? format(parseISO(post.created_at), 'MMMM d, yyyy') : 'Invalid Date';

  return (
    <div className="blog-post">
      <div className="blog-post-content">
        <div className="blog-post-date">{formattedDate}</div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
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
