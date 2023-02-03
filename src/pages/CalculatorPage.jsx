// KNOWN ISSUES:
// Cannot operate on big (requiring exponential notation) numbers.
// Using ANS button can push too big numbers onto display causing text overflow

import styles from "../styles/CalculatorPage.module.scss";

import { React, useState, useEffect, useReducer } from "react";

import mergeOperands from "../helpers/merge-operand";
import splitOperand from "../helpers/split-operand";
import calculateEquation from "../helpers/calculate-equation";

import BUTTON_TYPES from "../constants/button-types";
import BUTTON_STYLES from "../constants/button-styles";
import BUTTONS from "../constants/buttons";
import * as CONSTRAINTS from "../constants/constraints";

const initialEquation = {
  firstOperand: [],
  operator: null,
  secondOperand: [],
};

const equationReducer = (
  { firstOperand, operator, secondOperand },
  { buttonType, equationLength, equationPayload, prevAnswear }
) => {
  switch (buttonType) {
    case BUTTON_TYPES.OPERATOR:
      switch (equationLength) {
        case 0:
          return initialEquation;
        case 1:
        case 2:
          return {
            firstOperand,
            operator: equationPayload,
            secondOperand,
          };
        case 3:
          return {
            firstOperand: calculateEquation(
              { firstOperand, operator, secondOperand },
              prevAnswear.set
            ),
            operator: equationPayload,
            secondOperand: initialEquation.secondOperand,
          };
        default:
          throw new Error(`Oops! Equation length: ${equationLength}`);
      }

    case BUTTON_TYPES.OPERAND:
      switch (equationLength) {
        case 0:
          return {
            firstOperand: [equationPayload],
            operator,
            secondOperand,
          };

        case 1:
          return {
            firstOperand:
              firstOperand.length === CONSTRAINTS.MAX_DISPLAY_TEXT_LENGTH
                ? firstOperand
                : [...firstOperand, equationPayload],
            operator,
            secondOperand,
          };

        case 2:
          return {
            firstOperand,
            operator,
            secondOperand: [equationPayload],
          };

        case 3:
          return {
            firstOperand,
            operator,
            secondOperand:
              secondOperand.length === CONSTRAINTS.MAX_DISPLAY_TEXT_LENGTH
                ? secondOperand
                : [...secondOperand, equationPayload],
          };

        default:
          throw new Error(`Oops! Equation length: ${equationLength}`);
      }

    case BUTTON_TYPES.CLEAR_ELEMENT:
      switch (equationLength) {
        case 0:
          return initialEquation;

        case 1:
          return {
            firstOperand:
              firstOperand.length === 1 ? [] : [...firstOperand].slice(0, -1),
            operator,
            secondOperand,
          };

        case 2:
          return {
            firstOperand,
            operator: initialEquation.operator,
            secondOperand,
          };

        case 3:
          return {
            firstOperand,
            operator,
            secondOperand:
              secondOperand.length === 1 ? [] : [...secondOperand].slice(0, -1),
          };

        default:
          throw new Error(`Oops! Equation length: ${equationLength}`);
      }

    case BUTTON_TYPES.ALL_CLEAR:
      return initialEquation;

    case BUTTON_TYPES.POINT:
      switch (equationLength) {
        case 0:
          return {
            firstOperand: [equationPayload],
            operator,
            secondOperand,
          };

        case 1:
          return {
            firstOperand: firstOperand
              .map((operand) => operand.char)
              .includes(equationPayload.char)
              ? firstOperand
              : [...firstOperand, equationPayload],
            operator,
            secondOperand,
          };

        case 2:
          return {
            firstOperand,
            operator,
            secondOperand: [equationPayload],
          };

        case 3:
          return {
            firstOperand,
            operator,
            secondOperand: secondOperand
              .map((operand) => operand.char)
              .includes(equationPayload.char)
              ? secondOperand
              : [...secondOperand, equationPayload],
          };

        default:
          throw new Error(`Oops! Equation length: ${equationLength}`);
      }

    case BUTTON_TYPES.ANSWEAR:
      switch (equationLength) {
        case 0:
        case 1:
          return {
            firstOperand: prevAnswear.value
              ? splitOperand(prevAnswear.value)
              : firstOperand,
            operator,
            secondOperand,
          };

        case 2:
          return {
            firstOperand,
            operator,
            secondOperand: prevAnswear.value
              ? splitOperand(prevAnswear.value)
              : secondOperand,
          };

        case 3:
          return {
            firstOperand,
            operator,
            secondOperand: prevAnswear.value
              ? [...secondOperand].concat(splitOperand(prevAnswear.value))
              : secondOperand,
          };

        default:
          throw new Error(`Oops! Equation length: ${equationLength}`);
      }

    case BUTTON_TYPES.EQUALS:
      switch (equationLength) {
        case 0:
          return initialEquation;

        case 1:
        case 2:
          return {
            firstOperand,
            operator,
            secondOperand,
          };

        case 3:
          return {
            firstOperand: calculateEquation(
              { firstOperand, operator, secondOperand },
              prevAnswear.set
            ),
            operator: initialEquation.operator,
            secondOperand: initialEquation.secondOperand,
          };

        default:
          throw new Error(`Oops! Equation length: ${equationLength}`);
      }

    default:
      throw new Error(`Oops! Button type: ${buttonType}`);
  }
};

const CalculatorPage = () => {
  const [equation, dispatchEquation] = useReducer(
    equationReducer,
    initialEquation
  );

  const [equationLength, setEquationLength] = useState(0);
  const [displayEquation, setDisplayEquation] = useState({
    top: "",
    middle: "",
    bottom: "",
  });
  const [prevAnswear, setPrevAnswear] = useState(null);

  useEffect(() => {
    if (equation.firstOperand.length === 0) {
      setEquationLength(0);
      setDisplayEquation({
        top: "",
        middle: "",
        bottom: "",
      });
    } else if (equation.firstOperand.length > 0 && equation.operator === null) {
      setEquationLength(1);
      setDisplayEquation({
        top: mergeOperands(equation.firstOperand),
        middle: "",
        bottom: "",
      });
    } else if (
      equation.operator !== null &&
      equation.secondOperand.length === 0
    ) {
      setEquationLength(2);
      setDisplayEquation({
        top: mergeOperands(equation.firstOperand),
        middle: equation.operator.char,
        bottom: "",
      });
    } else if (equation.secondOperand.length > 0) {
      setEquationLength(3);
      setDisplayEquation({
        top: mergeOperands(equation.firstOperand),
        middle: equation.operator.char,
        bottom: mergeOperands(equation.secondOperand),
      });
    }
  }, [equation]);

  return (
    <div className={styles["calculator-page"]}>
      <div className={styles["calculator"]}>
        <div className={styles["calculator__display"]}>
          {displayEquation.top}
        </div>
        <div className={styles["calculator__display"]}>
          {displayEquation.middle}
        </div>
        <div className={styles["calculator__display"]}>
          {displayEquation.bottom}
        </div>

        {BUTTONS.map(
          ({ char: buttonChar, type: buttonType, style: buttonStyle }, idx) => (
            <button
              className={`${
                styles[
                  buttonStyle === BUTTON_STYLES.OPERAND
                    ? "calculator__btn--operand"
                    : buttonStyle === BUTTON_STYLES.OPERATOR
                    ? "calculator__btn--operator"
                    : buttonStyle === BUTTON_STYLES.UTIL
                    ? "calculator__btn--util"
                    : buttonStyle === BUTTON_STYLES.EQUALS
                    ? "calculator__btn--equals"
                    : null
                ]
              } ${styles["calculator__btn"]}`}
              key={idx}
              onClick={() =>
                dispatchEquation({
                  buttonType,
                  equationLength,
                  equationPayload: {
                    char: buttonChar,
                    type: buttonType,
                  },
                  prevAnswear: {
                    value: prevAnswear,
                    set: setPrevAnswear,
                  },
                })
              }
            >
              {buttonType === BUTTON_TYPES.ANSWEAR && prevAnswear
                ? prevAnswear.char.length >
                  CONSTRAINTS.MAX_ANSWEAR_BUTTON_TEXT_LENGTH
                  ? prevAnswear.char.slice(0, 5) + "..."
                  : prevAnswear.char
                : buttonChar}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;
