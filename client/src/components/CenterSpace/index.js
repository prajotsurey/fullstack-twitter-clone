import React from 'react'
import LeftSidebar from '../LeftSidebar';

const CentreSpace = (props) => {
  return(
    <div className="flex md:flex-row justify-center">
      <LeftSidebar />
      <div className="flex-grow max-w-screen-md"> 
        <div className="flex flex-col border-r border-l">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default CentreSpace;