function mouseDrag (element, translator) {
  let start;

  element.addEventListener('mousedown', async (event) => {
    start = translator(event);
  });

  return new rxjs.Observable(async (subscriber) => {
    element.addEventListener('mouseup', async (event) => {
      if (!start) { return; }

      subscriber.next({ start, end: translator(event) });

      start = null;
    });
  });
}

function nearest (minX, minY, maxX, maxY, event) {
  const clientRect = event.target.getBoundingClientRect();

  const clientX = event.clientX - clientRect.x;
  const clientY = event.clientY - clientRect.y;

  const rawX = Math.round(scale(0, event.target.width, minX, maxX, clientX));
  const rawY = Math.round(scale(0, event.target.height, minY, maxY, clientY));

  const x = scale(minX, maxX, 0, event.target.width, rawX);
  const y = scale(minY, maxY, 0, event.target.height, rawY);

  return { x, y };
}

function scale (inputMin, inputMax, outputMin, outputMax, input) {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;

  return ((input - inputMin) * (outputRange / inputRange)) + outputMin;
}

export { mouseDrag, nearest, scale };
