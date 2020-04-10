import { scale } from './util.js';

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

function drawVector (context, vector, style) {
  const { start, end } = vector;
  context.save();

  context.fillStyle = style;
  context.strokeStyle = style;

  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();

  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  context.beginPath();
  context.translate(end.x, end.y);
  context.rotate(angle);
  context.moveTo(0, 0);
  context.lineTo(-10, -5);
  context.lineTo(-10, 5);
  context.fill();

  context.restore();
}

export { clear, drawGrid, drawVector };
