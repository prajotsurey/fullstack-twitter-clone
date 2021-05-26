import React from 'react';
import {
  Formik, Field, Form
} from 'formik';
import * as Yup from 'yup'
import TextInput from '../TextInput';
import userService from '../../services/userService'

const SignUp = () => {
  const initialValues = {
    username: "",
    password: "",
    passwordConfirm: "",
  }
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirm: Yup.string().required(),
  })

  const submitForm = async (values) => {
    const credentials = {
      username: values.username,
      password: values.password,
    }

    await userService.createUser(credentials)

  };

  return(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {submitForm(values)}}
    > 
      {() => (
        <Form>
          <Field name="username" placeholder="username" component={TextInput}/>
          <Field name="password" placeholder="password" component={TextInput}/>
          <Field name="passwordConfirm" placeholder="confirm password" component={TextInput}/>
          <button type="submit">Sign In</button>
        </Form>
      )}
      
    </Formik>
  )
}

export default SignUp;