import React from 'react';
import { Link } from 'react-router-dom';

const StyledButton = ({children, inverted, ...rest}) => {
  if(inverted){
    return(
      <Link className="p-3 bg-white text-center rounded-full mb-4 bg-green-400 text-white font-bold" {...rest}>{children}</Link>
    )  
  }
  return(
    <Link className="p-3 bg-white text-center rounded-full mb-4 text-green-400 border-2 border-green-200 font-bold " {...rest}>{children}</Link>
  )
}

export default StyledButton;