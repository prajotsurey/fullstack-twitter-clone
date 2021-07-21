import React, { useEffect, useState } from 'react';
import Posts from '../../components/Posts';
import userService from '../../services/userService';
import useAuthStorage from '../../hooks/useAuthStorage';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const BookmarksList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [postsToShow, setPostsToShow] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const clearBookmarks = async () => {
    try{
      await userService.clearBookmarks(currentUser.id)
      const updatedUser = await userService.getUser(currentUser.id)
      setCurrentUser(updatedUser);
      setPostsToShow(updatedUser.bookmarked_posts);
      handleClose();
    } catch(error) {
        console.log(error);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useAuthStorage();

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(auth.getToken());
      if(user.id){
        const returnedUser = await userService.getUser(user.id);
        setCurrentUser(returnedUser);
        setPostsToShow(returnedUser.bookmarked_posts);
      }
    }

    fetchUser();
  },[auth])

  return(
    <>
    <div className="px-4 h-14 flex flex-row items-center border-b justify-between"> 
      <div className="flex flex-col">
        <div className="text-xl font-semibold">
          Bookmarks
        </div>
        <div className="text-xs text-gray-500">
          {currentUser?currentUser.username:''}
        </div>
      </div>
      <div className="w-10 h-10 bg-green-100 rounded-full" aria-controls="bookmarks-menu" aria-haspopup="true" onClick={handleClick}>
        
      </div>
      <Menu
        id="bookmarks-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className="text-gray-400" onClick={clearBookmarks}>Clear Bookmarks</MenuItem>
      </Menu>
    </div>
    <Posts posts={postsToShow} user={currentUser}/>
    </>
  );
}

export default BookmarksList