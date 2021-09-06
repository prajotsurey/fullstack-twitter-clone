import React from 'react';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ReactComponent as PostMenuIcon } from '../../icons/PostMenuIcon.svg';

const PopOver = ({id, addHandler, removeHandler, add}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddClick = () => {
    addHandler(id);
    handleClose();
  }
  
  const handleRemoveClick = () => {
    removeHandler(id);
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

return(
  <>
    <button className="block text-sm h-5" aria-controls={`menu${id}`} aria-haspopup="true" onClick={handleClick}>
      <PostMenuIcon />
    </button>
    <Menu
      id={`menu${id}`}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {add
      ?
        <MenuItem className="text-gray-400" onClick={() => {handleAddClick()}}>
          Add to bookmarks
        </MenuItem>
      :
        <MenuItem className="text-gray-400" onClick={() => {handleRemoveClick()}}>
          Remove from  bookmarks
        </MenuItem>
      }
    </Menu>
  </>
)}

export default PopOver;