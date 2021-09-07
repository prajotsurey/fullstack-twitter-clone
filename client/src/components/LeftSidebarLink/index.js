import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LeftSidebarLink = ({Icon, IconSelected, Text, to}) => {
  const location = useLocation();
  console.log(location.pathname.includes(to))
  return(
    <Link to={to} className="flex flex-col items-start group">
      <div className="my-1.5">
        <div className="flex flex-row items-center text-xl px-3 py-2.5 rounded-full font-normal group-hover:bg-black group-hover:bg-opacity-10">
          <div className="h-8 w-8 rounded-xl">
            { 
            location.pathname.includes(to)
            ? <>{IconSelected}</>
            : <>{Icon}</>
            }
          </div>
          <div className="hidden leftShowLarge:ml-2 leftShowLarge:block">
          {Text}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default LeftSidebarLink;