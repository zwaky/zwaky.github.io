class Particle {

  constructor(x = 0, y = 0) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.prevpos = this.pos.copy();
    //  this.force = createVector();
  }

  update() {
    this.vel.add(this.acc).mult(1);
    this.pos.add(this.vel).mult(1);
    this.acc.mult(0);
    this.vel.mult(0);
  }

  applyForce() {
    let x;
    let y;
    //  thetaX = this.pos.y;
    //    thetaY = -this.pos.y - this.pos.x;
    x = (0.5 * 0.5 * this.pos.x * this.pos.x - 5 * 0.2 * this.pos.y * this.pos.y - 0);

    y = 2 * 0.5 * 0.5 * this.pos.x * this.pos.y;
    this.force = createVector(x, y);
    this.force.normalize();
    this.acc = this.force.mult(updateSpeed);

  }

  show() {
    stroke(0, 30);
    strokeWeight(5);
    line(this.pos.x, this.pos.y, this.prevpos.x, this.prevpos.y);
    this.prevpos = this.pos.copy();

  }
}

let particles = [];
const updateSpeed = 2;
let grid;
let scl = 10;
let cols, rows;

let visualgrid = [];


function setup() {
  createCanvas(350, 350);
  cols = width / scl;
  rows = height / scl;
  for (let i = -cols; i <= cols * rows; i++) {
    visualgrid[i] = atan(i % cols * -2);
  }

  for (let i = 0; i < 00; i++) {
    particles.push(new Particle(random(width) - width / 2, random(height) - height / 2));
  }

}

function draw() {
  background(200, 10);
  translate(width / 2, height / 2);
  //grid = new Grid();

  for (let i = 0; i < particles.length; i++) {

    particles[i].applyForce();
    particles[i].show();
    particles[i].update();

    //  if (particles[i].pos.y >= height / 2 || particles[i].pos.y <= -height / 2 || particles[i].pos.x >= width / 2 || particles[i].pos.x <= -width / 2) {
    //    particles.splice(i, 1);
    //  }
  }
}

function mouseDragged() {
  for (let i = 0; i <= 0; i++) {
    particles.push(new Particle(random(-50, 50) + mouseX - (width / 2), random(-50, 50) + mouseY - (height / 2)));
  }
}