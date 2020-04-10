function scale (inputMin, inputMax, outputMin, outputMax, input) {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;

  return ((input - inputMin) * (outputRange / inputRange)) + outputMin;
}

export { scale };
