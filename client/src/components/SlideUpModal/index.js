import React from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1),
    width: '200px',
    textAlign: 'center'
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  slide: {
    position: 'fixed',
    bottom: '10px',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const SlideUpModal = ({checked, text}) => {
  const classes = useStyles();
  return (
      <Slide className={classes.slide} direction="up" in={checked} mountOnEnter unmountOnExit>
        <div>
          <div className="px-4 py-3 bg-enabledButton text-white text-sm rounded-md">
            {text}
          </div>
        </div>
      </Slide>
  );
}

export default SlideUpModal;
