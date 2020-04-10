function mouseDrag (element, translator) {
  const nextSubscribers = [];
  const errorSubscribers = [];
  const completeSubscribers = [];

  let start;

  element.addEventListener('mousedown', async (event) => {
    start = translator(event);

    nextSubscribers.forEach(s => s({ start, end: translator(event) }));
  });

  element.addEventListener('mousemove', async (event) => {
    if (!start) { return; }

    nextSubscribers.forEach(s => s({ start, end: translator(event) }));
  });

  element.addEventListener('mouseup', async (event) => {
    if (!start) { return; }

    completeSubscribers.forEach(s => s({ start, end: translator(event) }));

    start = null;
  });

  return {
    subscribe: (next, error, complete) => {
      if (next) {
        nextSubscribers.push(next);
      }

      if (error) {
        errorSubscribers.push(error);
      }

      if (complete) {
        completeSubscribers.push(complete);
      }
    }
  };
}

function nearest (min, max, event) {
  const clientRect = event.target.getBoundingClientRect();

  const clientX = event.clientX - clientRect.x;
  const clientY = event.clientY - clientRect.y;

  const x = Math.round(scale(0, event.target.width, min.x, max.x, clientX));
  const y = Math.round(scale(0, event.target.height, min.y, max.y, clientY));

  return { x, y };
}

function scale (inputMin, inputMax, outputMin, outputMax, input) {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;

  return ((input - inputMin) * (outputRange / inputRange)) + outputMin;
}

export { mouseDrag, nearest, scale };
