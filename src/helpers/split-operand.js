import BUTTON_TYPES from "../constants/button-types";

export const splitOperand = (operand) =>
  operand.char.split("").map((char) => ({
    char,
    type: BUTTON_TYPES.OPERAND,
  }));

export default splitOperand;
