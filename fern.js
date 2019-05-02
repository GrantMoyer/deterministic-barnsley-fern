// This file is released under the CC0 license:
// https://creativecommons.org/publicdomain/zero/1.0/

function setup() {
  createCanvas(600, 600);
  background(0);
  strokeWeight(1);
  stroke(0, 255, 0);
  fern(50);
}

function fern(n) {
  _fern(new Affine(height / 10, 0, 0, -height / 10, width / 2, height), n);
}

class Affine {
  constructor(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  then(a) {
    [this.a, this.b, this.c, this.d, this.e, this.f] = [
      a.a * this.a + a.b * this.c,
      a.a * this.b + a.b * this.d,
      a.c * this.a + a.d * this.c,
      a.c * this.b + a.d * this.d,
      a.a * this.e + a.b * this.f + a.e,
      a.c * this.e + a.d * this.f + a.f
    ];
  }
}

p5.Vector.prototype.affine = function(a) {
  [this.x, this.y] = [
    a.a * this.x + a.b * this.y + a.e,
    a.c * this.x + a.d * this.y + a.f
  ];
}

function _fern(aff, n) {
  if (n > 0) {
    // draw line
    s = createVector(0, 0);
    t = createVector(0, 1.6);
    s.affine(aff);
    t.affine(aff);
    line(s.x, s.y, t.x, t.y);

    // draw stalk
    let nextAff = new Affine(0.85, 0.04, -0.04, 0.85, 0, 1.6);
    nextAff.then(aff);
    _fern(nextAff, n - 1);

    // draw left branch
    nextAff = new Affine(0.20, -0.26, 0.23, 0.22, 0, 1.6);
    nextAff.then(aff);
    _fern(nextAff, Math.floor(n / 2));

    // draw right branch
    nextAff = new Affine(-0.15, 0.28, 0.26, 0.24, 0, 0.44);
    nextAff.then(aff);
    _fern(nextAff, Math.floor(n / 2));
  }
}
