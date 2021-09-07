import React, { useEffect, useState } from 'react';
import blogService from '../../services/postService';
import Post from '../../components/Post';
import CenterHeader from '../../components/CenterHeader';

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
      <CenterHeader>
        <div className="pl-4 text-xl font-semibold ">
          Bookmarks
        </div>
      </CenterHeader>
    {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Bookmarks