import React from 'react'
import { Field } from 'formik'
const TextInput = ({field, form: {touched, errors}, placeholder, ...props}) => {
  return(
    <div className="flex-row">
      <Field className="w-full h-10 p-4 rounded-full focus:outline-none focus:ring-1 focus:ring-green-200 focus:bg-white bg-gray-50" placeholder={placeholder} {...field}/>
      {touched[field.name] && errors[field.name] && <div className="text-red-500">{errors[field.name]}</div>}
    </div>
  )
}

export default TextInput