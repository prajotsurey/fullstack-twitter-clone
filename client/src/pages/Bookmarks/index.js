import React, { useEffect, useState } from 'react';
import blogService from '../../services/postService';
import Post from '../../components/Post';
import CenterHeader from '../../components/CenterHeader';
import SlideUpModal from '../../components/SlideUpModal';

const Bookmarks = () => {
  const [posts, setPosts] = useState([])

  const [checked, setChecked] = React.useState(false);
  const [slideText, setSlideText] = React.useState('')

  const checker = (text) => {
    setChecked(true)
    setSlideText(text)
    setTimeout(() => {
      setChecked(false)
    },500)
  }

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
    {posts.map(post => <Post key={post.id} post={post} activateModal={checker}/>)}
    <SlideUpModal checked={checked} text={slideText}/>

    </div>
  );
}

export default Bookmarks