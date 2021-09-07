import React, { useEffect, useState } from 'react';
import blogService from '../../services/postService';
import Post from '../../components/Post';

const Bookmarks = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await blogService.getBookmarks();
      setPosts(posts)
    }

    fetchPosts();

  },[])

  return(
    <div className="flex flex-col">
    <div className="h-14 flex flex-row items-center border-b fixed bg-white w-center "> 
      <div className="pl-4 text-xl font-semibold ">
        Bookmarks
      </div>
    </div>
    <div className="pl-4 h-14 flex flex-row items-center border-b"> 
    </div>
    {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Bookmarks