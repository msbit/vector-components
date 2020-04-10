class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  static magnitude ({ x, y }) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  static dotProduct ({ x: aX, y: aY }, { x: bX, y: bY }) {
    return aX * bX + aY + bY;
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
}

export { Vector };
