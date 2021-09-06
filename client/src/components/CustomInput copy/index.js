import React from 'react'
import { useField } from 'formik'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width:'100%',
    flex: '1',
    
  },

}));

const CustomInput = ({...props}) => {
  const [field, meta] = useField(props);
  const classes = useStyles();
  return (
    <Box mb={3}  className={classes.root}>
      <TextField 
        variant="outlined" 
        {...field} 
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        color="primary"
        fullWidth
      />
    </Box>
  );
}

export default CustomInput