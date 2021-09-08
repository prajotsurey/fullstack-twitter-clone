import React, { useState } from 'react';
import { ReactComponent as HomeIcon } from '../../icons/HomeIcon.svg';
import { ReactComponent as HomeIconClicked } from '../../icons/HomeIconClicked.svg';

import { ReactComponent as BookmarksIcon } from '../../icons/BookmarksIcon.svg';
import { ReactComponent as BookmarksIconClicked } from '../../icons/BookmarksClicked.svg';

import { ReactComponent as ProfileIcon } from '../../icons/ProfileIcon.svg';
import { ReactComponent as ProfileIconClicked } from '../../icons/ProfileClicked.svg';

import { ReactComponent as Logo } from '../../icons/LogoBlue.svg';
import { ReactComponent as MoreIcon } from '../../icons/MoreIcon.svg';

import { Link } from 'react-router-dom';
import LeftSidebarLink from '../LeftSidebarLink';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Fade } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '400px'
  }
}));

const LeftSidebar = ({username}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles()
  const history = useHistory()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogappuser')
    history.push('/')
    handleClose()
  }
  return(
    <div className="flex flex-col flex-grow items-end">
      {/* used position fixed fix the sidebar to the top. But it removes the sidebar from doc flow and flex grow does not work*/}
      {/* to get this working added a dummy element which has the same width properties as the sidebar. This makes flex grow work properly */}
      <div className="leftShowLarge:items-stretch md:flex leftShowLarge:w-leftLarge w-leftSmall">
      </div>
      <div className="top-0 bottom-0 flex flex-col py-1 px-3 items-center justify-between leftShowLarge:items-stretch md:flex leftShowLarge:w-leftLarge w-leftSmall fixed">
        <div>
          <Link to="/posts" className="flex flex-row self-start p-3 rounded-full hover:bg-blue-100 ">
            <div className="h-8 w-8 flex items-center justify-items-center">
              <Logo/>
            </div> 
          </Link>
          <LeftSidebarLink
            Icon={<HomeIcon/>}
            IconSelected={<HomeIconClicked />}
            to="/posts"
            Text="Home"
          />
          <LeftSidebarLink
            Icon={<BookmarksIcon/>}
            IconSelected={<BookmarksIconClicked />}

            to="/bookmarks"
            Text="Bookmarks"
          />
          <LeftSidebarLink
            Icon={<ProfileIcon/>}
            IconSelected={<ProfileIconClicked />}
            to="/profile"
            Text="Profile"
          />
        </div>
        <div className="">
          <div className="my-1.5 rounded-full hover:bg-black hover:bg-opacity-10 " onClick={handleClick}>
            <div className="flex flex-row items-center justify-between px-3 py-2.5 ">
              <div className="flex  flex-row items-center">
                <div className="text-md font-bold">
                  {username}
                </div>
              </div>
              <div className="">
                <MoreIcon />
              </div>
            </div>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
            classes={classes.root}
          > 
            <MenuItem className="text-gray-400" onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar