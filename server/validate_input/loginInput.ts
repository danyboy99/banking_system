// Validation for login input data
import validator from "validator";
import isEmpty from "./isEmpty";

const validateLoginInput = (data: any) => {
  let error: any = {};

  // Set default values for empty fields
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Validate email field
  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }

  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }

  // Validate password field
  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }

  return {
    error,
    isValid: isEmpty(error), // Returns true if no errors
  };
};

export default validateLoginInput;
