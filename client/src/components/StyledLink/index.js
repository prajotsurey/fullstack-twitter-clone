import React from 'react';
import { Link } from 'react-router-dom';

const StyledButton = ({children, filled, ...rest}) => {
  if(filled){
    return(
      <Link className="rounded-full w-full bg-enabledButton disabled:opacity-disabled leading-10 h-10 m-auto px-4 font-semibold text-white text-center" {...rest}>{children}</Link>
    )  
  }
  return(
    <Link className="rounded-full w-full border border-gray-200 border-black bg-white disabled:opacity-disabled leading-10 h-10 m-auto px-4 font-semibold text-black text-center" {...rest}>{children}</Link>
  )
}

export default StyledButton;