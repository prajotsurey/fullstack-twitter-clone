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
    <div className="pl-4 h-14 flex flex-row items-center border-b"> 
      <div className="flex flex-col">
        <div className="text-xl font-semibold">
          Bookmarks
        </div>
        <div className="text-xs text-gray-500">
          @username
        </div>
      </div>
    </div>
    <Posts posts={posts} />
    </>
  );
}

export default BlogList