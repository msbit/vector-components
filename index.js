import { wrappedContext } from './context.js';
import { mouseDrag, nearest } from './util.js';

window.addEventListener('load', async (event) => {
  const document = event.target;
  const window = event.currentTarget;

  const canvas = document.getElementById('canvas');

  const context = wrappedContext(canvas.getContext('2d'), { x: -15, y: -10 }, { x: 15, y: 10 });

  let draftVector;
  const vectors = [];

  mouseDrag(canvas, event => nearest({ x: -15, y: -10 }, { x: 15, y: 10 }, event)).subscribe(({ start, end }) => {
    if (start.x === end.x && start.y === end.y) {
      draftVector = null;
      return;
    }

    draftVector = { start, end };
  }, null, ({ start, end }) => {
    if (start.x !== end.x && start.y !== end.y) {
      vectors.push({ start, end });
    }

    draftVector = null;
  });

  window.setInterval(async (foo, bar, baz) => {
    context.clear();
    context.drawGrid();

    vectors.forEach(v => context.drawVector(v, 'green'));

    if (draftVector) {
      context.drawVector(draftVector, 'blue');
    }
  }, 40);
});
