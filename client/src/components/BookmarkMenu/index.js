import React, { useEffect, useState } from 'react';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ReactComponent as PostMenuIcon } from '../../icons/PostMenuIcon.svg';
import { IconButton, makeStyles } from '@material-ui/core';
import postService from '../../services/postService';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '9999px',
    color: 'rgba(156, 163, 175, 1)',
    padding: '0.375rem',
    '&:hover': {
      color: 'rgba(96, 165, 250, 1)',
      backgroundColor: 'rgba(219, 234, 254, 1);'
    }
  },

}));

const BookmarkMenu = ({id, status, notify}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bookmarkStatus, setBookmarkStatus] = useState();


  useEffect(() => {
    setBookmarkStatus(status)
  },[status])

  const addBookmark = async (e) => {
    try{
      e.stopPropagation()
      handleClose();
      await postService.addBookmark(id);
      setBookmarkStatus(true)
      setBookmarkStatus(!bookmarkStatus)
      notify('Tweet added to your bookmarks')
    } catch(err) {
      console.log(err)
    }
  }
  
  const removeBookmark = async (e) => {
    try{
      e.stopPropagation()  
      handleClose();
      await postService.removeBookmark(id);
      setBookmarkStatus(false)
      setBookmarkStatus(!bookmarkStatus)
      notify('Tweet removed from your bookmarks')
    } catch(err) {
      console.log(err)
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    
  };
  
return(
  <>
    <IconButton className={classes.root} onClick={(e) => { handleClick(e) }}>
      <PostMenuIcon />
    </IconButton>
    <Menu
      id={`menu${id}`}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {bookmarkStatus
      ?
        <MenuItem className="text-gray-400" onClick={(e) => {removeBookmark(e)}}>
          Remove from  bookmarks
        </MenuItem>
      : 
        <MenuItem className="text-gray-400" onClick={(e) => {addBookmark(e)}}>
          Add to bookmarks
        </MenuItem>
        
      }
    </Menu>
  </>
)}

export default BookmarkMenu;