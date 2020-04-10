function mouseDrag (element, translator) {
  const nextSubscribers = [];
  const errorSubscribers = [];
  const completeSubscribers = [];

  let start;
  let end;

  const startHandler = async (event) => {
    start = translator(event);
    end = translator(event);

    nextSubscribers.forEach(s => s({ start, end }));
  };

  const moveHandler = async (event) => {
    if (!start) { return; }

    end = translator(event);

    nextSubscribers.forEach(s => s({ start, end }));
  };

  element.addEventListener('mousedown', startHandler);
  element.addEventListener('touchstart', startHandler);

  element.addEventListener('mousemove', moveHandler);
  element.addEventListener('touchmove', moveHandler);

  element.addEventListener('mouseup', async (event) => {
    if (!start) { return; }

    end = translator(event);

    completeSubscribers.forEach(s => s({ start, end }));

    start = null;
    end = null;
  });

  element.addEventListener('touchend', async (event) => {
    if (!start) { return; }

    completeSubscribers.forEach(s => s({ start, end }));

    start = null;
    end = null;
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
  const { x: scaledX, y: scaledY } = scaleToElement(min, max, event);

  const x = Math.round(scaledX);
  const y = Math.round(scaledY);

  return { x, y };
}

function scaleToElement (min, max, event) {
  const clientRect = event.target.getBoundingClientRect();

  let source = event;

  switch (event.type) {
    case 'touchstart':
    case 'touchmove':
      source = event.touches[0];
      break;
  }

  const clientX = source.clientX - clientRect.x;
  const clientY = source.clientY - clientRect.y;

  const x = scale(0, clientRect.width, min.x, max.x, clientX);
  const y = scale(0, clientRect.height, min.y, max.y, clientY);

  return { x, y };
}

function scale (inputMin, inputMax, outputMin, outputMax, input) {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;

  return ((input - inputMin) * (outputRange / inputRange)) + outputMin;
}

export { mouseDrag, nearest, scale, scaleToElement };
