import validator from "validator";
import isEmpty from "./isEmpty";
const validateLoginInput = (data: any) => {
  let error: any = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }

  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateLoginInput;
