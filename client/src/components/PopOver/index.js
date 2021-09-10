import React from 'react';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ReactComponent as PostMenuIcon } from '../../icons/PostMenuIcon.svg';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '9999px',
    color: 'rgba(156, 163, 175, 1)',
    padding: '0.375rem',
    '&:hover': {
      color: 'rgba(96, 165, 250, 1)',
      backgroundColor: 'rgba(219, 234, 254, 1);'
    }
  },

}));

const PopOver = ({id, addHandler, removeHandler, bookmarkStatus, setBookmarkStatus}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget);
  };

  const handleAddClick = () => {
    addHandler(id);
    handleClose();
    setBookmarkStatus(!bookmarkStatus)
  }
  
  const handleRemoveClick = () => {
    removeHandler(id);
    handleClose();
    setBookmarkStatus(!bookmarkStatus)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

return(
  <>
    <IconButton className={classes.root} onClick={(e) => { handleClick(e) }}>
      <PostMenuIcon />
    </IconButton>
    <Menu
      id={`menu${id}`}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {bookmarkStatus
      ?
        <MenuItem className="text-gray-400" onClick={() => {handleRemoveClick()}}>
          Remove from  bookmarks
        </MenuItem>
      : 
        <MenuItem className="text-gray-400" onClick={() => {handleAddClick()}}>
          Add to bookmarks
        </MenuItem>
        
      }
    </Menu>
  </>
)}

export default PopOver;