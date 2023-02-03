import mergeOperands from "./merge-operand";
import splitOperand from "./split-operand";
import wrapOperand from "./wrap-operand";

import BUTTON_LABELS from "../constants/button-labels";

export const calculateEquation = (equation, setPrevAnswear) => {
  const [firstOperand, operator, secondOperand] = [
    parseFloat(mergeOperands(equation.firstOperand)),
    equation.operator.char,
    parseFloat(mergeOperands(equation.secondOperand)),
  ];

  switch (operator) {
    case BUTTON_LABELS.OPERATORS.ADD: {
      const answear = wrapOperand(firstOperand + secondOperand);
      setPrevAnswear(answear);
      return splitOperand(answear);
    }
    case BUTTON_LABELS.OPERATORS.SUB: {
      const answear = wrapOperand(firstOperand - secondOperand);
      setPrevAnswear(answear);
      return splitOperand(answear);
    }
    case BUTTON_LABELS.OPERATORS.MUL: {
      const answear = wrapOperand(firstOperand * secondOperand);
      setPrevAnswear(answear);
      return splitOperand(answear);
    }
    case BUTTON_LABELS.OPERATORS.DIV: {
      const answear = wrapOperand(firstOperand / secondOperand);
      setPrevAnswear(answear);
      return splitOperand(answear);
    }
    default:
      throw new Error("Oops! Invalid operator!");
  }
};

export default calculateEquation;
