import { scale } from './util.js';

function wrappedContext (context, min, max) {
  const origin = {
    x: scale(min.x, max.x, 0, context.canvas.width, 0),
    y: scale(min.y, max.y, 0, context.canvas.height, 0)
  };

  function scaleVector ({ x, y }) {
    return {
      x: scale(min.x, max.x, 0, context.canvas.width, x),
      y: scale(min.y, max.y, 0, context.canvas.height, y)
    };
  }

  return {
    clear: () => {
      context.save();

      context.fillStyle = 'white';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      context.restore();
    },

    drawGrid: () => {
      context.save();

      for (let x = min.x; x <= max.x; x++) {
        context.strokeStyle = x === 0 ? 'grey' : 'lightgrey';
        const canvasX = scale(min.x, max.x, 0, context.canvas.width, x);
        context.beginPath();
        context.moveTo(canvasX, 0);
        context.lineTo(canvasX, context.canvas.height);
        context.stroke();
      }

      for (let y = min.y; y <= max.y; y++) {
        context.strokeStyle = y === 0 ? 'grey' : 'lightgrey';
        const canvasY = scale(min.y, max.y, 0, context.canvas.height, y);
        context.beginPath();
        context.moveTo(0, canvasY);
        context.lineTo(context.canvas.width, canvasY);
        context.stroke();
      }

      context.restore();
    },

    drawVector: (vector, style) => {
      const { x, y } = scaleVector(vector);

      context.save();

      context.fillStyle = style;
      context.strokeStyle = style;

      context.beginPath();
      context.moveTo(origin.x, origin.y);
      context.lineTo(x, y);
      context.stroke();

      const angle = Math.atan2(y - origin.y, x - origin.x);
      context.beginPath();
      context.translate(x, y);
      context.rotate(angle);
      context.moveTo(0, 0);
      context.lineTo(-10, -5);
      context.lineTo(-10, 5);
      context.fill();

      context.restore();
    }
  };
}

export { wrappedContext };
