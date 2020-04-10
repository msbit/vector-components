import { wrappedContext } from './context.js';
import { mouseDrag, nearest } from './util.js';
import { perp } from './vector.js';

window.addEventListener('load', async (event) => {
  const document = event.target;
  const window = event.currentTarget;

  const canvas = document.getElementById('canvas');

  const context = wrappedContext(canvas.getContext('2d'), { x: -15, y: -10 }, { x: 15, y: 10 });

  let draftVector;
  let perpDraftVector;
  const vectors = [];

  mouseDrag(canvas, event => nearest({ x: -15, y: -10 }, { x: 15, y: 10 }, event)).subscribe(({ start, end }) => {
    if (end.x === 0 && end.y === 0) {
      draftVector = null;
      return;
    }

    draftVector = end;
    perpDraftVector = perp(draftVector);
  }, null, ({ start, end }) => {
    if (end.x !== 0 && end.y !== 0) {
      vectors.push(end);
    }

    draftVector = null;
    perpDraftVector = null;
  });

  window.setInterval(async (foo, bar, baz) => {
    context.clear();
    context.drawGrid();

    vectors.forEach(v => context.drawVector(v, 'green'));

    if (draftVector) {
      context.drawVector(draftVector, 'blue');
    }
    if (perpDraftVector) {
      context.drawVector(perpDraftVector, 'red');
    }
  }, 40);
});
