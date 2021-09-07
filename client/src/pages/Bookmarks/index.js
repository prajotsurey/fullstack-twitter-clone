import React, { useEffect, useState } from 'react';
import blogService from '../../services/postService';
import Post from '../../components/Post';

const Bookmarks = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('in bookmarks')
      const posts = await blogService.getBookmarks();
      setPosts(posts)
    }

    fetchPosts();

  },[])

  return(
    <>
    <div className="pl-4 h-14 flex flex-row items-center border-b"> 
      <div className="text-xl font-semibold">
        Bookmarks
      </div>
    </div>
    <div className="h-3 bg-gray-50 border-b">
    </div>
    {posts.map(post => <Post key={post.id} post={post} />)}
    </>
  );
}

export default Bookmarks