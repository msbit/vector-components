import { clear, drawGrid } from './context.js';
import { mouseDrag, nearest } from './util.js';

window.addEventListener('load', async (event) => {
  const document = event.target;

  const canvas = document.getElementById('canvas');

  const context = canvas.getContext('2d');

  clear(context);
  drawGrid(context, -15, -10, 15, 10);
  mouseDrag(canvas, x => nearest(-15, -10, 15, 10, x)).subscribe(({ start, end }) => {
    context.save();

    context.strokeStyle = 'blue';
    context.strokeWidth = 2;

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();

    context.restore();
  });
});
