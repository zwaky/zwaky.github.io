function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let survivaltime;
let survivalthreshold = 1000;
let hardshiplow = 2;
let hardshiphigh = 3;

function setup() {
  frameRate();
  createCanvas(1600, 1200);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  survivaltime = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      survivaltime[i][j] = 0;
    }
  }

}

function draw() {
  background(0);

  let next = make2DArray(cols, rows);


  //Drawing the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);

        if (survivaltime[i][j] >= survivalthreshold) {
          fill('#00810D');
          rect(x, y, resolution - 1, resolution - 1);
        }

      }
    }
  }



  //Calculating the Next state


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let state = grid[i][j];

      let neighbors = countNeighbors(grid, i, j);

      //Rules of Life

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
        survivaltime[i][j]++;
      } else if (state == 1 && (neighbors < hardshiplow || neighbors > hardshiphigh) && (survivaltime[i][j] < survivalthreshold)) {
        next[i][j] = 0;
        survivaltime[i][j] = 0;
      } else if (state == 1) {
        next[i][j] = state;
        survivaltime[i][j]++;
      } else if (state == 0) {
        next[i][j] = state;
        survivaltime[i][j] = 0;
      }

    }
  }


  grid = next;


}



function countNeighbors(grid, x, y) {

  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];

    }
  }

  sum -= grid[x][y];
  return sum;

}

function mouseDragged() {
  grid[floor(map(mouseX, 0, width, 0, cols))][floor(map(mouseY, 0, height, 0, rows))] = 1;
}