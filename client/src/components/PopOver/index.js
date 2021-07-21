import React from 'react';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

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
    <button className="flex-grow text-sm text-gray-400" aria-controls={`menu${id}`} aria-haspopup="true" onClick={handleClick}>
      {id}
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