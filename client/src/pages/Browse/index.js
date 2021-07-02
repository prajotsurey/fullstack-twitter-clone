import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import LeftSidebar from '../../components/LeftSidebar';
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
    <div className="flex flex-row justify-center">
      <LeftSidebar/>
      <div className="flex-grow max-w-screen-md"> 
        <div className="block md:hidden ">
          <NavBar handleLogout={1} />
        </div>
        <div className="flex flex-col border-r border-l">
          { posts.map(post => {
              return(
                <div key={post.id} className="flex flex-col mb-1 border-b p-4">
                  <div>{post.content}</div>
                  <div className="text-xs text-green-700">blog author</div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  );
}

export default BlogList