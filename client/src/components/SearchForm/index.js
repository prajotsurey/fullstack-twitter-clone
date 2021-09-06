import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/SearchIcon.svg';
import { Formik } from 'formik';

const SearchForm = ({initialValues, search}) => {
  const [focus, setFocus] = useState(false);
  //used onfocus and onblur to change the focus state variable which changes the searchIcon div's background and border
  return(
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {search(values)}}
      > 
        {props => (
          <form onSubmit={props.handleSubmit} className="flex-col w-full">
            <div className="flex flex-row">
              <div id="searchIcon" 
              className={
                focus
                ? "flex flex-row px-3 h-12 justify-center items-center rounded-l-full outline-none text-blue-400 border-r-0 border border-blue-400 bg-white"
                : "flex flex-row px-3 h-12 justify-center items-center rounded-l-full outline-none border-r-0 border border-transparent bg-gray-100"  
              }>
                <SearchIcon />
              </div>
              <div className="flex-grow">
                {/* used this type of input instead of custom field or normal field because they dont allow customizing the onBlur prop */}
                {/* maybe they do allow it. In that case use normal field here or a custom field via the usefield prop */}
                <input
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.search}
                  name="search"
                  onFocus={() => {
                    setFocus(true)
                  }}
                  onBlur={(e) => {
                    props.handleBlur(e)
                    setFocus(false)
                  }}
                  className="w-full h-12 pl-0 p-4 rounded-r-full focus:outline-none border border-l-0 border-transparent text-sm focus:border-blue-400 focus:bg-white bg-gray-100 placeholder-gray-500" 
                />
                {props.errors.search && <div id="feedback">{props.errors.search}</div>}
              </div>
            </div>
          </form>
        )}
        
    </Formik>
  )
}

export default SearchForm