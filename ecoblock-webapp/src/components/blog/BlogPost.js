import React from 'react';
import './BlogPost.css';

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p className="date">{post.date}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default BlogPost;
