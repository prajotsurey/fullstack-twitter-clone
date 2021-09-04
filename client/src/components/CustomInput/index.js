import React from 'react'
import { Field, useField } from 'formik'
const CustomInput = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="mb-4">
      <label className="mb-1 text-lg block">
        {label}
      </label>
      <input className="w-full h-12 p-4 rounded-md" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default CustomInput