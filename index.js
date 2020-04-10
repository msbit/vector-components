import { clear, drawGrid } from './context.js';

window.addEventListener('load', async (event) => {
  const document = event.target;

  const canvas = document.getElementById('canvas');

  const context = canvas.getContext('2d');

  clear(context);
  drawGrid(context, -15, -10, 15, 10);
});
