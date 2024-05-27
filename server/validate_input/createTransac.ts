import validator from "validator";
import isEmpty from "./isEmpty";
const validateCreateTransacInput = (data: any) => {
  let error: any = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";

  if (validator.isEmpty(data.type)) {
    error.type = "type field is Required";
  }
  if (data.type !== "deposit" || data.type !== "withdraw") {
    error.type = "type must be deposit or withdraw";
  }
  if (!Number(data.amount)) {
    error.amount = "amount must be a number";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateCreateTransacInput;
