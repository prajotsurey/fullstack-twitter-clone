import React from 'react';
import {
  Formik, Field, Form
} from 'formik';
import * as Yup from 'yup'
import TextInput from '../TextInput';

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

  const submitForm = (values) => {
    console.log(values)
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