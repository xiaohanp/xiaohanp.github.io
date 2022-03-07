// Xiaohan Peng
// 14/12/2021




let grid;
let next;
let cols;
let rows;
let resolution = 40;
let button_start;
let button_stop;
let first_start = false;
let fr = 10;

//create grid
function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    var myCanvas = createCanvas(1280, 640);
    myCanvas.parent('canvasDiv');
    frameRate(fr);

    cols = width / resolution;
    rows = height / resolution;
    //current cols: 16(beats) x 2
    //current rows: 8(instruments) x 2

    grid = make2DArray(cols, rows);


    button_start = createButton('start');
    button_start.position(600, 1030);
    button_start.mouseClicked(startFunction);

    button_stop = createButton('stop');
    button_stop.position(900, 1030);
    button_stop.mouseClicked(stopFunction);

    button_start.style('font-size', '20px');
    button_stop.style('font-size', '20px');

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    noLoop();
}


function mouseClicked(){

    let boundary_x = floor(mouseX/40);
    let boundary_y = floor(mouseY/40);

    if (grid[boundary_x][boundary_y] === 1) {
        grid[boundary_x][boundary_y] = 0;
    }else{
        grid[boundary_x][boundary_y] = 1;
    }

    if(!first_start){
        firstDraw();
        noLoop();

    }else{
        loop();
    }


}

function startFunction(){
   first_start = true;
}

function stopFunction(){
    first_start = false;

    //noLoop();
    //having noloop() or not doesnt make difference
}

function firstDraw(){
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
                let rand1 = Math.floor(Math.random() * 255);
                let rand2 = Math.floor(Math.random() * 255);
                let rand3 = Math.floor(Math.random() * 255);
                let c = color(rand1, rand2, rand3);
                fill(c);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }



}

function draw() {
    background(0);


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
                let rand1 = Math.floor(Math.random() * 255);
                let rand2 = Math.floor(Math.random() * 255);
                let rand3 = Math.floor(Math.random() * 255);
                let c = color(rand1, rand2, rand3);
                fill(c);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    next = make2DArray(cols, rows);

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // Count live neighbors!
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            if (state === 0 && neighbors === 3) {
                next[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }

    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
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