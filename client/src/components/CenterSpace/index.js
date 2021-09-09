import React from 'react'
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';

const CentreSpace = (props) => {
  return(
    <div className="flex md:flex-row justify-center">
      <LeftSidebar />
      <div className="flex flex-col border-r border-l">
        <div className="w-center"> 
          {props.children}
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default CentreSpace;