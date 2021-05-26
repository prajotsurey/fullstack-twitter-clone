import React from 'react';
import {
  Formik, Field, Form
} from 'formik';
import * as Yup from 'yup'
import TextInput from '../TextInput';
import loginService from '../../services/loginService';
import { useHistory } from 'react-router';

const Login = ({setUser}) => {
  const history = useHistory();
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {login(values)}}
    > 
      {() => (
        <Form>
          <Field name="username" placeholder="username" component={TextInput}/>
          <Field name="password" placeholder="password" component={TextInput}/>
          <button type="submit">Sign In</button>
        </Form>
      )}
      
    </Formik>
  )
}

export default Login