import React from 'react';
import { Link } from 'react-router-dom';

const StyledButton = ({children, inverted, ...rest}) => {
  if(inverted){
    return(
      <Link className="py-2 px-3 bg-white text-center rounded-full border bg-green-400 text-sm text-white font-bold" {...rest}>{children}</Link>
    )  
  }
  return(
    <Link className="p-3 bg-white text-center rounded-full border mb-4 text-green-400 border-2 text-sm border-green-200 font-bold " {...rest}>{children}</Link>
  )
}

export default StyledButton;