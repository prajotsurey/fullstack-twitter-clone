import React from 'react';

const StyledButton = ({children, filled, ...rest}) => {
  if(filled){
    return(
      <button className="rounded-full w-full bg-enabledButton disabled:opacity-disabled h-12 px-4 font-bold text-white" {...rest}>{children}</button>
    )  
  }
  return(
    <button className="rounded-full w-full border border-gray-200 border-black bg-white disabled:opacity-disabled h-12 px-4 font-bold text-black" {...rest}>{children}</button>
  )
}

export default StyledButton;