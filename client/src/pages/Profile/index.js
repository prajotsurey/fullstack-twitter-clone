import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

const Profile = ({user}) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  const fetchUser = async () => {
    const returnedUser = await userService.getUser(user.id);
    setCurrentUser(returnedUser);
  }

  useEffect(() => {
    fetchUser();
  },[])
  
  if(currentUser){
    return(
      <div className="">
        <div className="pl-4 h-14 flex flex-row items-center border-b"> 
          <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          </Link>
        </div>
        <div className="flex flex-row px-4 py-10 justify-between">
          <div>
            <div className="mx-2 h-16 w-16 rounded-md bg-green-200">
              img
            </div>
            <div className="text-2xl font-semibold">
              {currentUser.username}
            </div>
            <div className="text-sm text-gray-500">
              {currentUser.blogs.length} blogs
            </div>
          </div>
          <div>
            button here
          </div>
        </div>
        <div className="flex flex-row h-14 border-b">
          <button className="text-green-600 px-6 font-semibold box-border border-b-4 border-green-500 hover:bg-green-200 focus:outline-none active:bg-green-700 ">
            Blogs
          </button>
        </div>
        <div className="pl-4 flex flex-col">
        { currentUser.blogs.map(blog => {
            return(
              <div key={blog.id} className="flex flex-col mb-1 border-b p-4">
                <div>{blog.content}</div>
                <div className="text-xs text-green-700">blog author</div>
              </div>
            )
          })}
      </div>
      </div>
    )
  }

  return(
    <div className="pl-4 h-14 flex flex-row items-center border-b"> 
      <Link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>
    </div>
  )
}

export default Profile;