import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const NavBar = ({handleLogout}) => {
  const [show, setShow] = useState(false);
  const sidebar = show 
    ? 'fixed top-0 bottom-0 z-20 bg-green-300 w-64 transform transition duration-500 ease-in-out' 
    : 'fixed top-0 bottom-0 z-20 bg-green-300 w-64 transform -translate-x-full transition duration-500 ease-in-out'
  const overlayClass = show
    ? 'fixed top-0 bottom-0 right-0 left-0 z-10 bg-black bg-opacity-50 transform transition-colors duration-500 ease-in-out'
    : 'fixed top-0 bottom-0 right-0 left-0 z-10 bg-black bg-opacity-0 transform -translate-x-full transition duration-500 ease-in-out'
  return(
    <div>
      <div className="h-14 pl-4 flex flex-row items-center border-b"> 
        <button className="h-10 w-10 rounded-xl bg-green-200" onClick={() => setShow(!show)}></button>
      </div>
      <div className={`${sidebar} flex flex-col`}>
        <div className="h-14 border-b flex flex-row justify-between items-center px-6">
          <div className="text-2xl font-semibold" >Account info</div>
          <button className="h-10 w-10 rounded-xl bg-green-200 " onClick={() => setShow(!show)}></button>
        </div>
        <div>
          <Link to='/profile'>Profile</Link>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className={overlayClass}>
      </div>
    </div>
  )
};

export default NavBar;

