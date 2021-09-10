import { IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LikedIcon } from '../../icons/LikedIcon.svg';
import { ReactComponent as LikeIcon } from '../../icons/LikeIcon.svg';
import postService from '../../services/postService';
import { useHistory } from 'react-router';
import BookmarkMenu from '../BookmarkMenu';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '9999px',
    color: 'rgba(156, 163, 175, 1)',
    padding: '0.375rem',
    '&:hover': {
      color: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(252, 231, 243, 1)'
    }
  },

}));

const Post = ({ post , activateModal}) => {
  const classes = useStyles()
  const [likeStatus, setLikeStatus] = useState(Boolean(post.likeStatus))
  const history = useHistory()

  const handleLike = async (postId,e) => {
    e.stopPropagation()
    const response = await postService.likePost(postId)
    setLikeStatus(Boolean(response.likeStatus))
    console.log(response.likes)
  }

  const openPost = () => {
    console.log('inside open post')
    history.push(`/${post.creator.username}/post/${post.id}`)
  }

  return(
    <div key={post.id} className="flex flex-row border-b p-3 hover:bg-gray-50" onClick={openPost}>
      <div className="mr-3">
        <div className="h-12 w-12 rounded-xl bg-primary">
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
              <IconButton className={classes.root} onClick={(e) => { handleLike(post.id,e) }}>
                {
                  likeStatus
                  ?<LikedIcon />
                  :<LikeIcon />
                  }
              </IconButton>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="flex flex-row flex-grow justify-start items-center text-sm ">
            <BookmarkMenu id={post?.id} status={post?.bookmarkStatus} notify={activateModal} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;