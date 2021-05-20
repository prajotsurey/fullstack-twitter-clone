import React from 'react';

const BlogList = ({blogs}) => {
  return(
    <div>
      { blogs.map(blog => blog.content)}
    </div>
  );
}

export default BlogList