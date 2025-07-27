// Validation for banker signup input data
import validator from "validator";
import isEmpty from "./isEmpty";

const validateBankerSignup = (data: any) => {
  let error: any = {};

  // Set default values for empty fields
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.employees_number = !isEmpty(data.employees_number)
    ? data.employees_number
    : "";
  data.card_number = !isEmpty(data.card_number) ? data.card_number : "";

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

  // Validate name fields
  if (validator.isEmpty(data.firstname)) {
    error.firstname = "firstname field is Required";
  }
  if (validator.isEmpty(data.lastname)) {
    error.lastname = "lastname field is Required";
  }

  // Validate employee number field
  if (validator.isEmpty(data.employees_number)) {
    error.employees_number = "employees-number field is Required";
  }

  // Validate card number field
  if (validator.isEmpty(data.card_number)) {
    error.card_number = "card_number field is Required";
  }

  return {
    error,
    isValid: isEmpty(error), // Returns true if no errors
  };
};

export default validateBankerSignup;
