export const mergeOperands = (operands) =>
  operands.length === 1
    ? operands[0].char
    : operands
        .map((operand) => operand.char)
        // .join('') should work fine too
        .reduce((firstChar, secondChar) => firstChar + secondChar);

export default mergeOperands;
