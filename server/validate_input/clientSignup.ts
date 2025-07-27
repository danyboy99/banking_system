// Validation for client signup input data
import validator from "validator";
import isEmpty from "./isEmpty";

const validateClientSignup = (data: any) => {
  let error: any = {};

  // Set default values for empty fields
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.balance = !isEmpty(data.balance) ? data.balance : "";
  data.account_manager = !isEmpty(data.account_manager)
    ? data.account_manager
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

  // Validate balance is a number
  if (!Number(data.balance)) {
    error.balance = "balance must be a number";
  }

  // Validate account manager field
  if (validator.isEmpty(data.account_manager)) {
    error.account_manager = "account-manager field is Required";
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

export default validateClientSignup;
