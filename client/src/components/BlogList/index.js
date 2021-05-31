import React from 'react';
import { useHistory } from 'react-router';
import NavBar from '../NavBar';

const BlogList = ({blogs,user,handleLogout}) => {
  const history = useHistory()
  if(!user) {
    history.push('/login')
  }
  return(
    <div>
      <div className="block md:hidden ">
        <NavBar handleLogout={handleLogout}/>
      </div>
      <div className="flex flex-col border-r border-l">
        { blogs.map(blog => {
            return(
              <div key={blog.id} className="flex flex-col mb-1 border-b p-4">
                <div>{blog.content}</div>
                <div className="text-xs text-green-700">blog author</div>
              </div>
            )
          })}
      </div>
    </div>
  );
}

export default BlogList