import React from 'react'
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';

const CentreSpace = (props) => {
  return(
    <div className="flex md:flex-row justify-center">
      <LeftSidebar />
      <div className="flex flex-col min-h-screen h-full border-r border-l medium:w-auto w-full">
        <div className="medium:w-center w-full "> 
          {props.children}
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default CentreSpace;