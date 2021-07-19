import React from 'react';

const Posts = ({posts}) => {

  return(
    <>
    { 
      posts.map(post => {
        return(
          <div key={post.id} className="flex flex-row border-b p-3">
            <div className="mr-3">
              <div className="h-12 w-12 rounded-xl bg-green-200">

              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <div className="">
                  <span className="text-sm font-bold">
                    Name 
                  </span> 
                  <span className="text-sm text-gray-400">
                    @username
                  </span>
                  <span className="text-sm text-gray-400 pl-1">
                    . date
                  </span>
                </div>
                <div >
                  <span className="text-sm text-gray-400"> 
                    button
                  </span>
                </div>
              </div>
              <div>
                {post.content}
              </div>
              <div className="flex flex-row mt-3">
                <div className="flex-grow text-sm text-gray-400">
                  button
                </div>
                <div className="flex-grow text-sm text-gray-400">
                  button
                </div>
                <div className="flex-grow text-sm text-gray-400">
                  button
                </div>
                <div className="flex-grow text-sm text-gray-400">
                  button
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
    </>
  )
}

export default Posts;