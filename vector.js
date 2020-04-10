class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  static add ({ x: aX, y: aY }, { x: bX, y: bY }) {
    return new Vector(aX + bX, aY + bY);
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
    return new Vector(x, y);
  }

  static perpendicular ({ x, y }) {
    return Vector.normalise({
      x: y,
      y: -x
    });
  }

  static scalarProduct ({ x, y }, r) {
    return new Vector(x * r, y * r);
  }
}

export { Vector };
