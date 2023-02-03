import { LETTERING, OPERATORS, GLYPHS } from "./button-labels";
import TYPES from "./button-types";
import STYLES from "./button-styles";

const BUTTONS = [
  {
    char: LETTERING.CLEAR_ELEMENT,
    type: TYPES.CLEAR_ELEMENT,
    style: STYLES.UTIL,
  },
  {
    char: LETTERING.ALL_CLEAR,
    type: TYPES.ALL_CLEAR,
    style: STYLES.UTIL,
  },
  {
    char: LETTERING.ANSWEAR,
    type: TYPES.ANSWEAR,
    style: STYLES.UTIL,
  },
  {
    char: OPERATORS.DIV,
    type: TYPES.OPERATOR,
    style: STYLES.OPERATOR,
  },
  {
    char: "7",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: "8",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: "9",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: OPERATORS.MUL,
    type: TYPES.OPERATOR,
    style: STYLES.OPERATOR,
  },
  {
    char: "4",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: "5",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: "6",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: OPERATORS.SUB,
    type: TYPES.OPERATOR,
    style: STYLES.OPERATOR,
  },
  {
    char: "1",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: "2",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: "3",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: OPERATORS.ADD,
    type: TYPES.OPERATOR,
    style: STYLES.OPERATOR,
  },
  {
    char: GLYPHS.POINT,
    type: TYPES.POINT,
    style: STYLES.OPERATOR,
  },
  {
    char: "0",
    type: TYPES.OPERAND,
    style: STYLES.OPERAND,
  },
  {
    char: GLYPHS.EQUALS,
    type: TYPES.EQUALS,
    style: STYLES.EQUALS,
  },
];

export default BUTTONS;
