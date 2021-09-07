import React from 'react'
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';

const CentreSpace = (props) => {
  if(props.user){
    return(
      <div className="flex md:flex-row justify-center">
        <LeftSidebar username={props.user.username}/>
        <div className="flex flex-col border-r border-l">
          <div className="w-center"> 
            {props.children}
          </div>
        </div>
        <RightSidebar />
      </div>
    )
  }
  return(
    <>
    </>
  )
}

export default CentreSpace;