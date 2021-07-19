import React from 'react'
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';

const CentreSpace = (props) => {
  return(
    <div className="flex md:flex-row justify-center">
      <LeftSidebar />
      <div className="w-center"> 
        <div className="flex flex-col border-r border-l">
          {props.children}
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default CentreSpace;