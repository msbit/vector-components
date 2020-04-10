function mouseDrag (element, translator) {
  const nextSubscribers = [];
  const errorSubscribers = [];
  const completeSubscribers = [];

  let start;

  element.addEventListener('mousedown', async (event) => {
    start = translator(event);
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

  const rawX = Math.round(scale(0, event.target.width, min.x, max.x, clientX));
  const rawY = Math.round(scale(0, event.target.height, min.y, max.y, clientY));

  const x = scale(min.x, max.x, 0, event.target.width, rawX);
  const y = scale(min.y, max.y, 0, event.target.height, rawY);

  return { x, y };
}

function scale (inputMin, inputMax, outputMin, outputMax, input) {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;

  return ((input - inputMin) * (outputRange / inputRange)) + outputMin;
}

export { mouseDrag, nearest, scale };
