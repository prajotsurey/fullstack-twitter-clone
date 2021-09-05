import React from 'react';
import {
  Formik, Field, Form
} from 'formik';
import * as Yup from 'yup'
import CustomInput from '../../components/CustomInput';
import userService from '../../services/userService'
import { Link, useHistory } from 'react-router-dom'
import TwitterLogo from '../../components/TwitterLogo';
import { ReactComponent as Logo } from '../../icons/Logo blue.svg';

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

  const submitForm = async (values) => {
    const credentials = {
      username: values.username,
      password: values.password,
    }
    try{
      await userService.createUser(credentials)
      history.push('/login')
    } catch(error) {
      console.log(error)
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
        onSubmit={(values) => {submitForm(values)}}
      > 
        {() => (
          <Form className="flex-col w-full">
            {/* material ui textfield customized to work with formik*/}
            <CustomInput label="Username" name="username" placeholder="you@example.com" type="email" />
            <CustomInput label="Password" name="password" placeholder="Must be atleast 8 characters" type="password" />
            <CustomInput label="Confirm password" name="passwordConfirm" placeholder="Confirm password" type="password" />
            <button className="rounded-full w-full bg-enabledButton disabled:opacity-disabled h-12 px-4 font-bold text-white" type="submit">Sign up</button>
          </Form>
        )}
        
      </Formik>
      <Link className="mt-4 self-center text-primary text-sm" to='/login'>Log In</Link>
      </div>
    
    </div>
  )
}

export default SignUp;