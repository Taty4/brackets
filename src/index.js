module.exports = function check(str, bracketsConfig) {
  const alpha = {};
  const openBrackets = [];

  bracketsConfig.forEach(([open, close]) => {
    openBrackets.push(open);
    alpha[close] = open;
  });

  const stack = [];

  for (let i = 0; i < str.length; i += 1) {
    const currentBracket = str[i];

    const isSymmetric = bracketsConfig.some(
      ([open, close]) => open === close && open === currentBracket
    );

    if (isSymmetric) {
      if (stack[stack.length - 1] === currentBracket) {
        stack.pop();
      } else {
        stack.push(currentBracket);
      }
    } else if (openBrackets.includes(currentBracket)) {
      stack.push(currentBracket);
    } else {
      if (stack.length === 0) {
        return false;
      }

      const topEl = stack[stack.length - 1];

      if (topEl === alpha[currentBracket]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
};
