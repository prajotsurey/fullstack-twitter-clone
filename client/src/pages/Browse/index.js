import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      { 
        posts.map(post => {
          return(
            <div key={post.id} className="flex flex-col mb-1 border-b p-4">
              <div>{post.content}</div>
              <div className="text-xs text-green-700">blog author</div>
            </div>
          )
        })
      }
    </>
  );
}

export default BlogList