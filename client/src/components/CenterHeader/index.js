import React from 'react';

const CenterHeader = ({children}) => {
  
  return(
    <>
      <div className="h-14 flex flex-row items-center border-b fixed bg-white w-center "> 
        {children}
      </div>
      <div className="pl-4 h-14 flex flex-row items-center border-b"></div>
    </>
  )
}

export default CenterHeader;