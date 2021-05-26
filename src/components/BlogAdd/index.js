import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../TextInput';
import blogService from '../../services/blogService';

const BlogAddView = () => {

  const initialValues = {
  title: "",
  content: "",
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(5,'Title should have atleast 5 characters'),
    content: Yup.string().required().min(5,'Content should have atleast 5 characters'),
  })

  const submitForm = async (values) => {
    const savedBlog = await blogService.createBblog({
      title: values.title,
      content: values.content,
    })
    console.log(savedBlog)
  }

  return(
    <div>
      Add blog view
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(values)
        }}
        validationSchema={validationSchema}
      >
        { () => (
          <Form>
            <Field name="title" placeholder="title" component={TextInput}/>
            <Field type="text" name="content" placeholder="content" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default BlogAddView