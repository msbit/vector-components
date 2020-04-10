class Vector {
  static add ({ x: aX, y: aY }, { x: bX, y: bY }) {
    return { x: aX + bX, y: aY + bY };
  }

  static dotProduct ({ x: aX, y: aY }, { x: bX, y: bY }) {
    return aX * bX + aY * bY;
  }

  static magnitude ({ x, y }) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  static normalise ({ x, y }) {
    const magnitude = Vector.magnitude({ x, y });
    x /= magnitude;
    y /= magnitude;
    return { x, y };
  }

  static perpendicular ({ x, y }) {
    return Vector.normalise({
      x: y,
      y: -x
    });
  }

  static scalarProduct ({ x, y }, r) {
    return { x: x * r, y: y * r };
  }
}

export { Vector };
