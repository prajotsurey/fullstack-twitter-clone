import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import postService from '../../services/postService';
import { IconButton, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReactComponent as LikedIcon } from '../../icons/LikedIcon.svg';
import { ReactComponent as LikeIcon } from '../../icons/LikeIcon.svg';
import PopOver from '../../components/PopOver';
import { useHistory } from 'react-router';
import SlideUpModal from '../../components/SlideUpModal';
import CenterHeader from '../../components/CenterHeader';


const PostDetail = () => {
  const [post, setPost] = useState()
  let { username, postId } = useParams();
  const classes = makeStyles()
  const [bookmarkStatus, setBookmarkStatus] = useState(true);
  const [likeStatus, setLikeStatus] = useState(false)
  const history = useHistory()
  const [ likes, setLikes ] = useState()
  const [checked, setChecked] = React.useState(false);
  const [slideText, setSlideText] = React.useState('')

  useEffect( () => {
    const getPost = async () => {
      const post = await postService.getPost(postId)
      setPost(post)
      setBookmarkStatus(post.bookmarkStatus)
      setLikeStatus(post.likeStatus)
      setLikes(post.likes)
    }
    getPost()
  },[])

  const AddBookmark = async (postID) => {
    try{
      await postService.addBookmark(postID);
      activateModal('Tweet added to your bookmarks')
    } catch(err) {
      console.log(err)
    }
  }
  
  const RemoveBookmark = async (postID) => {
    try{
      await postService.removeBookmark(postID);
      activateModal('Tweet removed from your bookmarks')
    } catch(err) {
      console.log(err)
    }
  }

  const activateModal = (text) => {
    setChecked(true)
    setSlideText(text)
    setTimeout(() => {
      setChecked(false)
    },500)
  }

  const handleLike = async (postId,e) => {
    e.stopPropagation()
    const response = await postService.likePost(postId)
    setLikeStatus(Boolean(response.likeStatus))
    setLikes(response.likes)
  }

  const openPost = () => {
    history.push(`/${post.creator.username}/post/${post.id}`)
  }

  return(
    <div className="flex flex-col">
      <CenterHeader>
        <div className="pl-4">
        </div>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div className="flex flex-col ml-7 text-xl font-semibold">
          Tweet
        </div>
      </CenterHeader>
      <div className="flex flex-col p-3">
        <div className="flex flex-row items-center mr-3">
          <div className="h-12 w-12 rounded-full bg-primary mr-3">
          </div>
          <div className="text-sm font-semibold hover:underline">
            <Link to={`/${post?.creator?.username}`}>
              {post?.creator?.username}
            </Link>
            <div className="text-sm font-normal text-gray-500">
                @handle
            </div>
          </div>
        </div>
        <div className="text-xl mt-3">
          {post?.content}
        </div>
        <div className="text-sm text-gray-500 mt-3">
          {post?.createdAt}
        </div>
        <div className="mt-4 border-t border-b py-3.5 pl-1 text-sm">
          <span className="font-bold mr-1">{likes}</span>
          {likes === 1
          ?
          <span className="text-gray-500">like</span>
          :
          <span className="text-gray-500">likes</span>
          }
        </div>
        <div className="flex flex-row justify-around border-b">
          <div className="flex flex-row justify-start items-center text-sm ">
            <IconButton className={classes.root} onClick={(e) => { handleLike(post?.id,e) }}>
              {
                likeStatus
                ?<LikedIcon />
                :<LikeIcon />
                }
            </IconButton>
          </div>
          <div className="flex flex-row justify-start items-center text-sm ">
            <PopOver id={post?.id} addHandler={AddBookmark} removeHandler={RemoveBookmark} bookmarkStatus={bookmarkStatus} setBookmarkStatus={setBookmarkStatus}>
              button
            </PopOver>
          </div>
        </div>
        <SlideUpModal checked={checked} text={slideText}/>
      </div>
    </div>
  )
}

export default PostDetail;