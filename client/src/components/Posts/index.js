import React from 'react';
import userService from '../../services/userService';
import PopOver from '../PopOver';

const Posts = ({user, posts}) => {

  const AddBookmark = (postID) => {
    userService.addBookmark(user.id,postID);
    console.log('add bookmark',postID);
  }
  
  const RemoveBookmark = (postID) => {
    userService.removeBookmark(user.id,postID);
    console.log('remove bookmark',postID);
  }

  return(
    <>
    { 
      posts.map(post => {
        let add = true
        if(user){
          add = user.bookmarked_posts.find(p => p.id === post.id) ? false : true
        }
        return(
          <div key={post.id} className="flex flex-row border-b p-3 hover:bg-gray-50">
            <div className="mr-3">
              <div className="h-12 w-12 rounded-xl bg-green-200">
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <div className="">
                  <span className="text-sm font-bold">
                    {post.id}
                  </span> 
                  <span className="text-sm text-gray-400">
                    @username
                  </span>
                  <span className="text-sm text-gray-400 pl-1">
                    . date
                  </span>
                  <div>
                  {post.content}
                  </div>
                </div>
                <div >
                  <button className="w-10 h-10 p-2 rounded-full bg-gray-50 hover:bg-gray-100" >
                  </button>
                </div>
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
                <PopOver id={post.id} addHandler={AddBookmark} removeHandler={RemoveBookmark} add={add}>
                  button
                </PopOver>
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