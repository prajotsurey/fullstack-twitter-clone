const parsedErrors = (errors) => {
  let parsedErrors = {};
  errors.forEach(({field, message}) => {
    parsedErrors[field] = message;
  })
  return parsedErrors;
}

export default parsedErrors;