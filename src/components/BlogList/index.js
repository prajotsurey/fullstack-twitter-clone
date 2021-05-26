import React from 'react';
import { useHistory } from 'react-router'

const BlogList = ({blogs,user}) => {
  const history = useHistory()

  if(!user) {
    history.push('/login')
  }
  return(
    <div>
      { blogs.map(blog => blog.content)}
    </div>
  );
}

export default BlogList