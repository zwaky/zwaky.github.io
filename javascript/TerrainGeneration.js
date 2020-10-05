let cols, rows;
let scl = 20;
let w = 800;
let h = 800;

let terrain = [];
let flying = 0;

function setup() {
  createCanvas(800, 200, WEBGL);
  cols = w / scl;
  rows = h / scl;
}

function draw() {
  frameRate(40);

  flying -= 0.05;
  let xoff = flying;
  for (let x = 0; x < rows; x++) {
    terrain[x] = [];
    let yoff = 0;
    for (let y = 0; y < cols; y++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -30, 30);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  stroke(255);
  noFill();
  rotateX(PI / 3 + 0.2);
  translate(-w / 2 + 26, -h / 2 - 80);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);

    for (let x = 0; x < cols; x++) {

      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

}