import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const NavBar = ({handleLogout}) => {
  const [show, setShow] = useState(false);
  const classes = show 
    ? 'fixed top-0 bottom-0 z-10 bg-green-300 w-64 transform transition duration-500 ease-in-out' 
    : 'fixed top-0 bottom-0 z-10 bg-green-300 w-64 transform -translate-x-full transition duration-500 ease-in-out'
  return(
    <div>
      <div className="h-14 pl-4 flex flex-row items-center border-b"> 
        <Link to='/blogs'>blogs</Link>
        <Link to='/addblog'>Add blog</Link>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => setShow(!show)}>toggle</button>
      </div>
      <div className={classes}>
        <button onClick={() => setShow(!show)}>toggle</button>
      </div>
    </div>
  )
};

export default NavBar;

