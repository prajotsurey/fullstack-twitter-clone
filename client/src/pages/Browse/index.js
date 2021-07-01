import React from 'react';
import NavBar from '../../components/NavBar';
import LeftSidebar from '../../components/LeftSidebar';
const BlogList = ({blogs,user,handleLogout}) => {
  console.log('blog browse')
  return(
    <div className="flex flex-row justify-center">
      <LeftSidebar/>
      <div className="flex-grow max-w-screen-md"> 
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
    </div>
  );
}

export default BlogList