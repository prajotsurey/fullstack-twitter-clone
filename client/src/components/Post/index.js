import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import PopOver from '../PopOver';
import { ReactComponent as LikeIcon } from '../../icons/LikeIcon.svg';
import { ReactComponent as LikedIcon } from '../../icons/LikedIcon.svg';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import postService from '../../services/postService';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0px',
    color: 'inherit'
  },

}));

const Post = ({ post, user}) => {
  const classes = useStyles()
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if(user){
      setLiked(user.liked_posts.find(p => p.id === post.id) ? true : false)
      setBookmarked(user.bookmarked_posts.find(p => p.id === post.id) ? true : false)
    }
  },[])

  const AddBookmark = (postID) => {
    userService.addBookmark(user.id,postID);
    console.log('add bookmark',postID);
  }
  
  const RemoveBookmark = (postID) => {
    userService.removeBookmark(user.id,postID);
    console.log('remove bookmark',postID);
  }

  const handleLike = (postId) => {
    const response = postService.likePost(postId)
    console.log(response)
    setLiked(!liked)
  }

  return(
    <div key={post.id} className="flex flex-row border-b p-3 hover:bg-gray-50">
      <div className="mr-3">
        <div className="h-12 w-12 rounded-xl bg-green-200">
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          <div className="">
            <span className="text-sm font-semibold hover:underline">
              <Link to={`/${post.creator.username}`}>
                {post.creator.username}
              </Link>
            </span>
            <span className="text-sm text-gray-400 pl-1">
              @handle
            </span>
            <span className="text-sm text-gray-400 pl-1">
              . date
            </span>
            <div>
            {post.content}
            </div>
          </div>
          <div >
            <button className="w-10 h-10 p-2 rounded-full bg-gray-50 hover:bg-gray-100" >
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <div className="flex flex-row flex-grow justify-start items-center text-sm ">
            <div className="text-gray-400 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-100 p-1.5">
              <LikeIcon />
            </div>
          </div>
          <div className="flex flex-row flex-grow justify-start items-center text-sm ">
            <div className="text-gray-400 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-100 p-1.5">
              <LikeIcon />
            </div>
          </div>
          <div className="flex flex-row flex-grow justify-start items-center text-sm ">
            <div className=" rounded-full hover:text-pink-500 text-gray-400 hover:text-pink-500 hover:bg-pink-100 p-1.5">
              <IconButton className={classes.root} onClick={() => { handleLike(post.id) }}>
                {
                  liked
                  ?<LikedIcon />
                  :<LikeIcon />
                  }
              </IconButton>
            </div>
          </div>
          <div className="flex flex-row flex-grow justify-start items-center text-sm ">
            <div className="text-gray-400 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-100 p-1.5">
              <PopOver id={post.id} addHandler={AddBookmark} removeHandler={RemoveBookmark} add={!bookmarked}>
                button
              </PopOver>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;