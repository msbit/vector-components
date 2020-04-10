import { clear, drawGrid } from './context.js';
import { nearest } from './util.js';

window.addEventListener('load', async (event) => {
  const document = event.target;

  const canvas = document.getElementById('canvas');

  const context = canvas.getContext('2d');

  clear(context);
  drawGrid(context, -15, -10, 15, 10);

  canvas.addEventListener('click', async (event) => {
    const { x, y } = nearest(-15, -10, 15, 10, event);

    context.save();

    context.fillStyle = 'green';
    context.beginPath();
    context.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2);
    context.fill();

    context.restore();
  });
});
