import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Posts = ({posts}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const AddToBookmarks = () => {
    handleClose();
    console.log('bookmarkadded')
  }

  const handleClose = () => {
    setAnchorEl(null);
  };


  return(
    <>
    { 
      posts.map(post => {
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
                    Name 
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
                <div className="flex-grow text-sm text-gray-400" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <button>
                    button
                  </button>
                </div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem className="text-gray-400" onClick={AddToBookmarks}>Add to bookmarks</MenuItem>
                  </Menu>
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