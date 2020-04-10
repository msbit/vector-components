window.addEventListener('load', async (event) => {
  const document = event.target;

  const canvas = document.getElementById('canvas');

  const context = canvas.getContext('2d');

  clear(context);
  drawGrid(context, -15, -10, 15, 10);
});

function clear (context) {
  context.save();

  context.fillStyle = 'white';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.restore();
}

function drawGrid (context, minX, minY, maxX, maxY) {
  context.save();

  for (let x = minX; x <= maxX; x++) {
    context.strokeStyle = x === 0 ? 'red' : 'grey';
    const canvasX = scale(minX, maxX, 0, context.canvas.width, x);
    context.beginPath();
    context.moveTo(canvasX, 0);
    context.lineTo(canvasX, context.canvas.height);
    context.stroke();
  }

  for (let y = minY; y <= maxY; y++) {
    context.strokeStyle = y === 0 ? 'red' : 'grey';
    const canvasY = scale(minY, maxY, 0, context.canvas.height, y);
    context.beginPath();
    context.moveTo(0, canvasY);
    context.lineTo(context.canvas.width, canvasY);
    context.stroke();
  }

  context.restore();
}

function scale (inputMin, inputMax, outputMin, outputMax, input) {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;

  return ((input - inputMin) * (outputRange / inputRange)) + outputMin;
}
