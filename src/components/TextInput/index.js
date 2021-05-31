import React from 'react'
import { Field } from 'formik'
const TextInput = ({field, form: {touched, errors}, placeholder, ...props}) => {
  return(
    <div className="flex-col mb-4">
      <Field className="w-full h-12 p-4 rounded-md" placeholder={placeholder} {...field}/>
      {touched[field.name] && errors[field.name] && <div className="text-red-500">{errors[field.name]}</div>}
    </div>
  )
}

export default TextInput