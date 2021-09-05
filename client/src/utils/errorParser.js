const parsedErrors = (errors) => {
  let parsedErrors = {};
  errors.forEach(({field, message}) => {
    parsedErrors[field] = message;
  })
  console.log(parsedErrors)
  return parsedErrors;
}

export default parsedErrors;