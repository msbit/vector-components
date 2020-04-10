function magnitude ({ x, y }) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function normalise ({ x, y }) {
  const mag = magnitude({ x, y });
  return {
    x: x / mag,
    y: y / mag
  };
}

function perp ({ x, y }) {
  return normalise({
    x: y,
    y: -x
  });
}

export { perp };
