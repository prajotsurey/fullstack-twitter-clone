import React from 'react';
import {
  Formik, Field, Form
} from 'formik';
import * as Yup from 'yup'
import CustomInput from '../../components/CustomInput';
import userService from '../../services/userService'
import { Link, useHistory } from 'react-router-dom'
import { ReactComponent as Logo } from '../../icons/LogoBlue.svg';
import parsedErrors from '../../utils/errorParser';
import StyledButton from '../../components/StyledButton';

const SignUp = () => {
  const history = useHistory();
  
  const initialValues = {
    username: "",
    password: "",
    passwordConfirm: "",
  }
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').min(4, "username must be longer than 3 letters"),
    password: Yup.string().required('Password is required').min(7, "password must be longer than 7 letters"),
    passwordConfirm: Yup.string().required('Password confirmation is required').min(7, "password must be longer than 7 letters"),
  })

  const submitForm = async (values, setErrors) => {
  
    const credentials = {
      username: values.username,
      password: values.password,
    }
    try{
      const response = await userService.createUser(credentials)
      history.push('/login')
    } catch(error) {
      const errors = error.response.data.error
      await setErrors(parsedErrors(errors))
    }
    
  };

  return(
    //added a grid to center it's child
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col items-center w-full sm:w-96 shadow-lg rounded-md p-4"> {/* form container*/}
        <div className="mb-4 text-2xl font-semibold self-start">
            <Logo className="h-8 mb-8"/>  {/* svg */}
            Create your account
        </div>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async(values, {setErrors}) => {
          await submitForm(values, setErrors)
        }}
      > 
        {() => (
          <Form className="flex-col w-full">
            {/* material ui textfield customized to work with formik*/}
            <CustomInput label="Username" name="username" type="text" />
            <CustomInput label="Password" name="password" placeholder="Must be atleast 8 characters" type="password" />
            <CustomInput label="Confirm password" name="passwordConfirm" placeholder="Confirm password" type="password" />
            <StyledButton type="submit">Sign up</StyledButton>
          </Form>
        )}
        
      </Formik>
      <Link className="mt-4 self-center text-primary text-sm" to='/login'>Log In</Link>
      </div>
    
    </div>
  )
}

export default SignUp;