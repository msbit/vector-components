import { clear, drawGrid, drawVector } from './context.js';
import { mouseDrag, nearest } from './util.js';

window.addEventListener('load', async (event) => {
  const document = event.target;
  const window = event.currentTarget;

  const canvas = document.getElementById('canvas');

  const context = canvas.getContext('2d');

  let draftVector;
  const vectors = [];

  mouseDrag(canvas, x => nearest(-15, -10, 15, 10, x)).subscribe(({ start, end }) => {
    draftVector = { start, end };
  }, null, ({ start, end }) => {
    vectors.push({ start, end });

    draftVector = null;
  });

  window.setInterval(async (foo, bar, baz) => {
    clear(context);
    drawGrid(context, -15, -10, 15, 10);

    vectors.forEach(v => drawVector(context, v, 'green'));

    if (draftVector) {
      drawVector(context, draftVector, 'blue');
    }
  }, 40);
});
