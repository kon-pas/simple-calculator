import BUTTON_TYPES from "../constants/button-types";

export const wrapOperand = operand => ({
  char: operand.toString(),
  type: BUTTON_TYPES.OPERAND,
});

export default wrapOperand;
