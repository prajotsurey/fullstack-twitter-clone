import React from 'react';

const SwitchButton = ({children,name,currentSwitch, ...rest}) => {
  if(name === currentSwitch){
    return(
      <button {...rest} 
      className="text-green-600 flex-grow px-6 font-semibold box-border 
      border-b-4 border-green-500 hover:bg-green-200 focus:outline-none active:bg-green-700 ">
        {children}
      </button>
    )
  }
  return(
    <button {...rest} 
    className="text-green-600 flex-grow px-6 font-semibold box-border 
    pb-1 hover:bg-green-200 focus:outline-none active:bg-green-700 ">
      {children}
    </button>
  )
}

export default SwitchButton;