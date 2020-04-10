import { wrappedContext } from './context.js';
import { mouseDrag, nearest } from './util.js';

window.addEventListener('load', async (event) => {
  const document = event.target;
  const window = event.currentTarget;

  const canvas = document.getElementById('canvas');
  const inputs = document.getElementsByTagName('input');

  const context = wrappedContext(canvas.getContext('2d'), { x: -15, y: -10 }, { x: 15, y: 10 });

  let vectorIndex = -1;
  const draftVectors = [null, null];
  const draftVectorColours = ['lightblue', 'lightgreen'];
  const vectors = [null, null];
  const vectorColours = ['blue', 'green'];

  function findChecked () {
    vectorIndex = [].findIndex.call(inputs, x => x.checked);
  }

  [].forEach.call(inputs, (input) => {
    input.addEventListener('change', findChecked);
  });

  findChecked();

  mouseDrag(canvas, event => nearest({ x: -15, y: -10 }, { x: 15, y: 10 }, event)).subscribe(({ start, end }) => {
    if (vectorIndex === -1) { return; }

    if (end.x === 0 && end.y === 0) {
      draftVectors[vectorIndex] = null;
      return;
    }

    draftVectors[vectorIndex] = end;
  }, null, ({ start, end }) => {
    if (vectorIndex === -1) { return; }

    if (end.x !== 0 || end.y !== 0) {
      vectors[vectorIndex] = end;
    }

    draftVectors[vectorIndex] = null;
  });

  window.setInterval(async () => {
    context.clear();
    context.drawGrid();

    for (let i = 0; i < 2; i++) {
      if (draftVectors[i] !== null) {
        context.drawVector(draftVectors[i], draftVectorColours[i]);
      }

      if (vectors[i] !== null) {
        context.drawVector(vectors[i], vectorColours[i]);
      }
    }
  }, 40);
});
