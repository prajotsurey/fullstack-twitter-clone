import React from 'react';
import { useHistory } from 'react-router'

const BlogList = ({blogs,user}) => {
  const history = useHistory()

  if(!user) {
    history.push('/login')
  }
  return(
    <div className="pl-4 flex flex-col">
      { blogs.map(blog => {
          return(
            <div className="flex flex-col mb-1 border-b p-4">
              <div>{blog.content}</div>
              <div className="text-xs text-green-700">blog author</div>
            </div>
          )
        })}
    </div>
  );
}

export default BlogList