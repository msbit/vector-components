import { wrappedContext } from './context.js';
import { mouseDrag, scaleToCanvas } from './util.js';
import { Vector } from './vector.js';

window.addEventListener('load', async (event) => {
  const document = event.target;
  const window = event.currentTarget;

  const canvas = document.getElementById('canvas');
  const inputs = document.getElementsByTagName('input');

  const context = wrappedContext(canvas.getContext('2d'), { x: -10, y: -10 }, { x: 10, y: 10 });

  let vectorIndex = -1;
  const vectors = [null, null];
  const vectorColours = ['blue', 'green'];

  function findChecked () {
    vectorIndex = [].findIndex.call(inputs, x => x.checked);
  }

  [].forEach.call(inputs, (input) => {
    input.addEventListener('change', findChecked);
  });

  findChecked();

  mouseDrag(canvas, event => scaleToCanvas({ x: -10, y: -10 }, { x: 10, y: 10 }, event)).subscribe(({ start, end }) => {
    if (vectorIndex === -1) { return; }

    if (end.x === 0 && end.y === 0) {
      vectors[vectorIndex] = null;
      return;
    }

    vectors[vectorIndex] = end;
  }, null, ({ start, end }) => {
    if (vectorIndex === -1) { return; }

    if (end.x !== 0 || end.y !== 0) {
      vectors[vectorIndex] = end;
    }
  });

  window.setInterval(async () => {
    context.clear();
    context.drawGrid();

    for (let i = 0; i < 2; i++) {
      if (vectors[i] !== null) {
        context.drawVector(vectors[i], vectorColours[i]);
        context.drawVector(Vector.perpendicular(vectors[i]), 'black');
        context.drawVector(Vector.normalise(vectors[i]), 'black');
      }
    }

    if (vectors[0] === null || vectors[1] === null) { return; }

    const aPerpendicularB = Vector.dotProduct(vectors[0], Vector.perpendicular(vectors[1]));
    const aParallelB = Vector.dotProduct(vectors[0], Vector.normalise(vectors[1]));

    const perpendicularVector = Vector.scalarProduct(Vector.perpendicular(vectors[1]), aPerpendicularB);
    const parallelVector = Vector.scalarProduct(Vector.normalise(vectors[1]), aParallelB);

    context.drawVector(perpendicularVector, 'red');
    context.drawVector(parallelVector, 'red');
  }, 40);
});
