import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = ({username}) => {
  return(
    <div className="top-0 bottom-0 flex flex-col py-4 items-center leftShowLarge:items-start md:flex leftShowLarge:w-leftLarge w-leftSmall ">
      <div className="px-3">
        <div className="flex flex-row items-center text-2xl px-3 py-3 rounded-full font-semibold hover:bg-green-50">
          <div className="h-8 w-8 rounded-xl bg-green-200">
          </div>
          <div className="hidden leftShowLarge:ml-2 leftShowLarge:block">
          <Link to="/posts">Home</Link>
          </div>
        </div>
        <div className="flex flex-row items-center text-2xl px-3 py-3 rounded-full font-semibold hover:bg-green-50">
          <div className="h-8 w-8 rounded-xl bg-green-200">
          </div>
          <div className="hidden leftShowLarge:ml-2 leftShowLarge:block">
            Explore
          </div>
        </div>
        <div className="flex flex-row items-center text-2xl px-3 py-3 rounded-full font-semibold hover:bg-green-50">
          <div className="h-8 w-8 rounded-xl bg-green-200">
          </div>
          <div className="hidden leftShowLarge:ml-2 leftShowLarge:block">
          <Link to="/bookmarks">Bookmarks</Link>
          </div>
        </div>
        <div className="flex flex-row items-center text-2xl px-3 py-3 rounded-full font-semibold hover:bg-green-50">
          <div className="h-8 w-8 rounded-xl bg-green-200">
          </div>
          <div className="hidden leftShowLarge:ml-2 leftShowLarge:block">
          <Link to={`/${username}`}>Profile</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar