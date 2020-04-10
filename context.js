import { scale } from './util.js';

function wrappedContext (context, min, max) {
  function scaleVector ({ start, end }) {
    return {
      start: {
        x: scale(min.x, max.x, 0, context.canvas.width, start.x),
        y: scale(min.y, max.y, 0, context.canvas.height, start.y)
      },
      end: {
        x: scale(min.x, max.x, 0, context.canvas.width, end.x),
        y: scale(min.y, max.y, 0, context.canvas.height, end.y)
      }
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
        context.strokeStyle = x === 0 ? 'red' : 'grey';
        const canvasX = scale(min.x, max.x, 0, context.canvas.width, x);
        context.beginPath();
        context.moveTo(canvasX, 0);
        context.lineTo(canvasX, context.canvas.height);
        context.stroke();
      }

      for (let y = min.y; y <= max.y; y++) {
        context.strokeStyle = y === 0 ? 'red' : 'grey';
        const canvasY = scale(min.y, max.y, 0, context.canvas.height, y);
        context.beginPath();
        context.moveTo(0, canvasY);
        context.lineTo(context.canvas.width, canvasY);
        context.stroke();
      }

      context.restore();
    },

    drawVector: (vector, style) => {
      const { start, end } = scaleVector(vector);

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
  };
}

export { wrappedContext };
