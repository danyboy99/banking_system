// Validation for create transaction input data
import validator from "validator";
import isEmpty from "./isEmpty";

const validateCreateTransacInput = (data: any) => {
  let error: any = {};

  // Set default values for empty fields
  data.type = !isEmpty(data.type) ? data.type : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";

  // Validate transaction type field
  if (validator.isEmpty(data.type)) {
    error.type = "type field is Required";
  }

  // Validate transaction amount is a number
  if (!Number(data.amount)) {
    error.amount = "amount must be a number";
  }

  return {
    error,
    isValid: isEmpty(error), // Returns true if no errors
  };
};

export default validateCreateTransacInput;
