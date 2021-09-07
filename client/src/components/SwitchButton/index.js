import React from 'react';

const SwitchButton = ({children,name,currentSwitch, ...rest}) => {
  if(name === currentSwitch){
    return(
      <div {...rest} 
      className="flex flex-col items-center justify-center text-sm flex-grow px-6 font-semibold box-border 
      hover:bg-gray-200 active:bg-green-700 ">
        <div className="flex flex-col justify-center flex-grow">
            {children}
        </div>
        <div className=" h-1 border-2 border-blue-500 rounded-full w-full -mt-2"></div>
      </div>
    )
  }
  return(
    <div {...rest} 
    className="flex flex-col items-center justify-center text-gray-500 text-sm flex-grow px-6 font-medium box-border
    hover:bg-gray-200 active:bg-green-700 ">
      <div className="flex flex-col justify-center flex-grow">
          {children}
      </div>
      <div className=" h-1 w-full -mt-2"></div>
    </div>
  )
}

export default SwitchButton;