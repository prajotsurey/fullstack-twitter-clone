import React from 'react';

import {
  Formik, Field, Form
} from 'formik';
import SearchInput from '../../components/SearchInput';

const initialValues = {
  search: "",
}


const RightSidebar = () => {
  
  const search = (search) => {
    console.log(search)
  }

  return(
    <div className="flex flex-col flex-grow items-start">
      <div className="top-0 bottom-0 flex-col py-1 ml-7 mr-3 lg:items-start hidden rightShowSmall:flex rightShowSmall:w-rightSmall rightShowLarge:w-rightLarge ">
        <div className="w-full">
          <Formik
          initialValues={initialValues}
          onSubmit={(values) => {search(values)}}
          > 
            {() => (
              <Form className="flex-col">
                <Field name="search" placeholder="Search Twitter" component={SearchInput}/>
                {/* <button className="rounded-md w-full bg-green-200 h-12 px-4" type="submit">Sign In</button> */}
              </Form>
            )}
            
          </Formik>
        </div>


        <div className="flex flex-col mt-3 rounded-xl bg-gray-50 w-full">
          <div className="px-4 py-3 text-xl font-semibold border-b">
            What's happening
          </div>
          <div className="px-4 py-3 border-b flex flex-row">
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">
                <span>
                  News 
                </span> 
                <span className="pl-1">
                  . time
                </span>
              </div>
              <div className="text-sm font-semibold">
                Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit,  
                labore et dolore magna aliqua.
              </div>
            </div>
            <div className="w-52 rounded-lg bg-green-100">
            </div>
          </div>
          <div className="px-4 py-3 border-b flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">
                Trending in India
              </div>
              <div className="text-sm font-semibold mb-1">
                #Lorem ipsum dolor sit
              </div>
              <div className="text-xs text-gray-500 mb-1">
                Trending with something
              </div>
            </div>
            <div className="">
              button
            </div>
          </div>
          <div className="px-4 py-3 border-b flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">
                Trending in India
              </div>
              <div className="text-sm font-semibold mb-1">
                #Lorem ipsum dolor sit
              </div>
              <div className="text-xs text-gray-500 mb-1">
                Trending with something
              </div>
            </div>
            <div className="">
              button
            </div>
          </div>
          <div className="px-4 py-3 border-b flex flex-row">
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">
                <span>
                  News 
                </span> 
                <span className="pl-1">
                  . time
                </span>
              </div>
              <div className="text-sm font-semibold">
                Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit,  
                labore et dolore magna aliqua.
              </div>
            </div>
            <div className="w-52 rounded-lg bg-green-100">
            </div>
          </div>
          <div className="px-4 py-4 text-sm flex flex-row text-green-300">
            Show more
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar