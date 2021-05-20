import React from 'react'
import { Field } from 'formik'
const TextInput = ({field, form: {touched, errors}, placeholder, ...props}) => {
  return(
    <div>
      <Field placeholder={placeholder} {...field}/>
      {touched[field.name] && errors[field.name] && <div>{errors[field.name]}</div>}
    </div>
  )
}

export default TextInput