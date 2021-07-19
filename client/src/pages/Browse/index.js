import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from '../../components/Posts';

const BlogList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      let url = '/api/posts/';
      const result = await axios.get(url);
      setPosts(result.data);
    }

    fetchPosts();

  },[])

  return(
    <>
    <Posts posts={posts} />
    </>
  );
}

export default BlogList