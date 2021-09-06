import React from 'react';
import { ReactComponent as HomeIcon } from '../../icons/HomeIcon.svg';
import { ReactComponent as BookmarksIcon } from '../../icons/BookmarksIcon.svg';
import { ReactComponent as ProfileIcon } from '../../icons/ProfileIcon.svg';
import { ReactComponent as Logo } from '../../icons/LogoBlue.svg';
import { Link } from 'react-router-dom';
import LeftSidebarLink from '../LeftSidebarLink';

const LeftSidebar = ({username}) => {
  return(
    <div className="flex flex-col flex-grow items-end">
      {/* used position fixed fix the sidebar to the top. But it removes the sidebar from doc flow and flex grow does not work*/}
      {/* to get this working added a dummy element which has the same width properties as the sidebar. This makes flex grow work properly */}
      <div className="leftShowLarge:items-stretch md:flex leftShowLarge:w-leftLarge w-leftSmall">
      </div>
      <div className="top-0 bottom-0 flex flex-col py-1 px-3 items-center leftShowLarge:items-stretch md:flex leftShowLarge:w-leftLarge w-leftSmall fixed">
        <Link to="/posts" className="flex flex-row self-start p-3 rounded-full hover:bg-blue-100 ">
          <div className="h-8 w-8 flex items-center justify-items-center">
            <Logo/>
          </div> 
        </Link>
        <LeftSidebarLink
          Icon={<HomeIcon/>}
          to="/posts"
          Text="Home"
        />
        <LeftSidebarLink
          Icon={<BookmarksIcon/>}
          to="/bookmarks"
          Text="Bookmarks"
        />
        <LeftSidebarLink
          Icon={<ProfileIcon/>}
          to="/profile"
          Text="Profile"
        />
      </div>
    </div>
  )
}

export default LeftSidebar