import React from 'react';
import {
  Formik, Field, Form
} from 'formik';
import * as Yup from 'yup'
import TextInput from '../TextInput';
import loginService from '../../services/loginService';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login = ({user, setUser}) => {
  const history = useHistory();
  if(user){
    history.push('/blogs');
  }
  const initialValues = {
    username: "",
    password: "",
  }
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  })

  const login = async (values) => {
    try{
      const user = await loginService.login(values)
      setUser(user)
      history.push('/')
      window.localStorage.setItem(
        'blogappuser', JSON.stringify(user)
      ) 
    } catch(error) {
      console.log(error)
    }
  };

  return(
    <div className="w-full md:w-4/12 h-screen flex flex-col p-5 bg-gray-200 align-center">
      <div className="mb-4 text-2xl font-semibold">
        Login
      </div>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {login(values)}}
      > 
        {() => (
          <Form className="flex-col">
            <Field name="username" placeholder="Username" component={TextInput}/>
            <Field name="password" placeholder="Password" component={TextInput}/>
            <button className="rounded-md w-full bg-green-200 h-12 px-4" type="submit">Sign In</button>
          </Form>
        )}
        
      </Formik>
      <Link className="mt-4 self-center text-green-500 text-sm" to='/signup'>Sign Up</Link>
    </div>
  )
}

export default Login