let mic, recorder, soundFile;
let state = 0; // mousePress will increment from Record, to Stop, to Play
let img1, img2, img3, img4;
let drum1, drum2, drum3, drum4, drum5, drum6, drum7, drum8;
let shapeMove = 0; // mouse drag state
let dragMove = 0; // Determine if dragging has been performed
let patternMove = 0; // Mark which pattern is moved
var leftBuffer; // split canvas into three parts, insBuffer means instrument, left is grid, right is displaying pattern
var rightBuffer;
var insBuffer;
let gameFrameRate = 4;  //default frame rate = 4, corresponding with speed x1
let patternLength = 4;

function frameRateSet(rate){
  gameFrameRate = rate;
  frameRate(gameFrameRate);
}

function playGame(){
  playState = !playState;
  document.getElementById("play-btn").classList.toggle("hidden");
  document.getElementById("pause-btn").classList.toggle("hidden");
}

function randomBoard(){
  for(let k = 0; k < instrumentGrids.length; k++){
    for(let i = 0; i < instrumentCols; i++){
      for(let j = 0; j < instrumentRows; j++){
        instrumentGrids[k].grid[i][j] = floor(random(2));
      }
    }
  }
}

function clearBoard(){
  if(playState){
    playGame();
  }
  for(let k = 0; k < instrumentGrids.length; k++){
    for(let i = 0; i < instrumentCols; i++){
      for(let j = 0; j < instrumentRows; j++){
        instrumentGrids[k].grid[i][j] = 0;
      }
    }
  }
}

//create 2D array
function make2DArray (cols, rows){
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

//recordSound
function clickRecBtn (){
   // important !!! use this to solve the buffer problem
  getAudioContext().resume()
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);
    text('Recording now!', 20, 20);
    document.getElementById("recordButton").style.color = "red";
    state++;
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile
    document.getElementById("recordButton").style.color = "grey";
    document.getElementById("saveButton").style.color = "blue";
    state++;
  }
}

function clickSavBtn(){
  if (state === 2) {
    //soundFile.play(); // play the result!
    saveSound(soundFile, 'mySound.wav'); // save file
    document.getElementById("saveButton").style.color = "grey";
    state = 0;
    document.getElementById('recordButton').value = "Record";
  //  document.getElementById('recordButton').value = "Record";
}}

//class for defining the instrument's grid
class instrumentGrid{
  constructor(initY, deadColor, liveColor, instrumentCols, instrumentRows){
    this.initY = initY;
    this.deadColor = deadColor;
    this.liveColor = liveColor;
    this.grid = make2DArray(instrumentCols, instrumentRows);
  }
}


let colorLib = [['#fc8370','#e8563f'],['#fcd277','#f5ba45'],
                ['#b4e080','#8ac054'],['#62ddbd','#35bb9b'],
                ['#73b1f4','#4b89da'],['#b3a5ef','#967ada'],
                ['#f299ce','#d670ac'],['#f4d0b5','#e4b693']];

let frameCount = 0;
let instrumentType = 8;
let instrumentCols = 32; //define the cols of each instrument's grid
let instrumentRows = 2; //define the rows of each instrument's grid
let instrumentGrids;  //8 x (32x2) grid
let instrumentSound;
let instrumentUnit = 2; // 2x2 means a unit
let resolution = 30; //define the size of the minimal cell
let playState = false; //0 means game stops, user can draw; 1 means game starts
let part = new p5.Part();
let phrase = new Array(instrumentType);
let pattern = make2DArray(instrumentCols/instrumentUnit, instrumentType);
let posX, posY, zoneY; //indicates the mouse's position in the grid

function preload(){
  soundFormats('wav', 'ogg');
  instrumentSound = new Array(instrumentType);
  for(let i = 0; i < instrumentSound.length; i++){
    instrumentSound[i]  = loadSound('soundFile/instrument' + i + '.wav');
  }
/*
  img1 = loadImage("img/pattern1.jpg");
  img2 = loadImage("img/pattern2.jpg");
  img3 = loadImage("img/pattern3.png");
  img4 = loadImage("img/pattern4.png");

 */
  img1 = loadImage("img/pattern1_inv.png");
  img2 = loadImage("img/pattern2_inv.png");
  img3 = loadImage("img/pattern3_inv.png");
  img4 = loadImage("img/pattern4_inv.png");
  /*
  drum1 = loadImage("instrumentImg/drum1.png");
  drum2 = loadImage("instrumentImg/drum2.png");
  drum3 = loadImage("instrumentImg/drum3.png");
  drum4 = loadImage("instrumentImg/drum4.png");
  drum5 = loadImage("instrumentImg/drum5.png");
  drum6 = loadImage("instrumentImg/drum6.png");
  drum7 = loadImage("instrumentImg/drum7.png");
  drum8 = loadImage("instrumentImg/drum8.png");
  */
}


function setup(){

  var myCanvas = createCanvas(1020, 480);
  //insBuffer = createGraphics(60,480);
  leftBuffer = createGraphics(960, 480);
  rightBuffer = createGraphics(60, 480);
  myCanvas.parent('canvasDiv');

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();

  instrumentCols = leftBuffer.width / resolution;
  instrumentRows = leftBuffer.height / (resolution * instrumentType);  // split the grid based on the instrument numbers
  instrumentGrids = new Array(instrumentType);
  for(let k=0; k < instrumentGrids.length; k++){
    let instrumentOffsetY = 0 + k * instrumentRows * resolution;
    instrumentGrids[k] = new instrumentGrid(instrumentOffsetY, colorLib[k][0], colorLib[k][1], instrumentCols, instrumentRows);
    for(let i = 0; i < instrumentCols; i++){
      for(let j = 0; j < instrumentRows; j++){
        instrumentGrids[k].grid[i][j] = 0;
      }
    }
  }
  console.log(instrumentGrids);
  frameRate(gameFrameRate);
}

function draw(){
  console.log('pixelFillFlag: ' + pixelFillFlag);
  console.log(gameFrameRate);
  //detect whether there is a picture binarilization array value
  if(pixelFillFlag == true){
    for(let i = 0; i < pixelVal.length; i++){
      for(let j = 0; j < pixelVal[i].length; j++){
        let zone = int(j / 2);
        let x = i;
        let y = j % 2;
        instrumentGrids[zone].grid[x][y] = pixelVal[i][j];
      }
    }
    pixelFillFlag = false;
    console.log(pixelVal);
    for(let i = 0; i < instrumentGrids.length; i++){
      console.log('instrument val: ' + i + instrumentGrids[i]);
    }
  }

  background("#fff1e6");
  //insBuffer.background(0);
  //rightBuffer.background(0);

  for(let k = 0; k < instrumentGrids.length; k++){
    for(let i = 0; i < instrumentCols; i++){
      for(let j = 0; j < instrumentRows; j++){
        let x = i * resolution;
        let y = j * resolution + instrumentGrids[k].initY;
        if(instrumentGrids[k].grid[i][j] == 0){
          fill(instrumentGrids[k].deadColor);
        }else {
          fill(instrumentGrids[k].liveColor);
        }
        stroke(0);
        strokeWeight(1);
        rect(x, y, resolution-1, resolution-1);
      }
    }
  }


  if(playState == true){

    //play the instrument sound

    playInstrument();

    //compute next generation based on grid
    for(let k = 0; k < instrumentGrids.length; k++){
      let next = make2DArray(instrumentCols, instrumentRows);
      for(let i = 0; i < instrumentCols; i++){
        for(let j = 0; j < instrumentRows; j++){
          let state = instrumentGrids[k].grid[i][j];
          let neighbors = countNeighbors(k, i, j);
          if(state == 0 && neighbors == 3){
            next[i][j] = 1;
          }else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
          }else {
            next[i][j] = state;
          }
        }
      }
      instrumentGrids[k].grid = next;
    }
    frameCount++;
  }
  //when playstate == false i.e. paused
  else{

  }

    //image(insBuffer, 0, 0, 60, 480);
    image(leftBuffer, 0, 0, 960, 480);
    image(rightBuffer, 960, 0, 60, 480);

    //display pattern
    image(img1,960,0,60,60);
    image(img2,975,90,30,120);
    image(img3,960,240,60,90);
    image(img4,960,360,60,120);
    //drag and drop patterns
    patternDragDrop();
    //instrument icons
    /*
    image(drum1,0,0,60,60);
    image(drum2,0,60,60,60);
    image(drum3,0,120,60,60);
    image(drum4,0,180,60,60);
    image(drum5,0,240,60,60);
    image(drum6,0,300,60,60);
    image(drum7,0,360,60,60);
    image(drum8,0,420,60,60);
    */
}

function updateMouseInGrid(){
  posX = int(mouseX / resolution);
  zoneY = int(mouseY / (resolution * 2));
  posY = int((mouseY % (resolution * 2)) / resolution);
}

function patternDragDrop(){

  //pattern 1's drag and drop
  if(patternMove == 1 && shapeMove == 1 && dragMove == 1){
    image(img1,mouseX,mouseY,60,60);
    console.log("pattern1",mouseX, mouseY);
  }
  if (patternMove == 1 && shapeMove == 2 && dragMove == 1){
    updateMouseInGrid();  //calculate the mouse's position in the grid
    if(posY == 0){
      instrumentGrids[zoneY].grid[posX][posY] = 1;
      instrumentGrids[zoneY].grid[posX+1][posY] = 1;
      instrumentGrids[zoneY].grid[posX][posY+1] = 1;
      instrumentGrids[zoneY].grid[posX+1][posY+1] = 1;
    }else{
      instrumentGrids[zoneY].grid[posX][posY] = 1;
      instrumentGrids[zoneY].grid[posX+1][posY] = 1;
      instrumentGrids[zoneY + 1].grid[posX][posY-1] = 1;
      instrumentGrids[zoneY + 1].grid[posX+1][posY-1] = 1;
    }

    console.log("pattern1 function triggered,", patternMove, shapeMove, dragMove);
    shapeMove = 0;
    dragMove = 0;
    patternMove = 0;
  }
  //pattern2's drag and drop
    if(patternMove == 2 && shapeMove == 1 && dragMove == 1){
      image(img2,mouseX,mouseY,30,120);
      console.log("pattern2",mouseX, mouseY);
    }
    if (patternMove == 2 && shapeMove == 2 && dragMove == 1){
      updateMouseInGrid();  //calculate the mouse's position in the grid
      if(posY == 0){
        instrumentGrids[zoneY].grid[posX][posY] = 1;
        instrumentGrids[zoneY].grid[posX][posY+1] = 1;
        instrumentGrids[zoneY + 1].grid[posX][posY] = 1;
        instrumentGrids[zoneY + 1].grid[posX][posY+1] = 1;
      }else {
        instrumentGrids[zoneY].grid[posX][posY] = 1;
        instrumentGrids[zoneY + 1].grid[posX][posY-1] = 1;
        instrumentGrids[zoneY + 1].grid[posX][posY] = 1;
        instrumentGrids[zoneY + 2].grid[posX][posY-1] = 1;
      }
      console.log("pattern2 function triggered,", patternMove, shapeMove, dragMove);
      shapeMove = 0;
      dragMove = 0;
      patternMove = 0;
    }
    //pattern3's drag and drop
      if(patternMove == 3 && shapeMove == 1 && dragMove == 1){
        image(img3,mouseX,mouseY,60,90);
        console.log("pattern3",mouseX, mouseY);
      }
      if (patternMove == 3 && shapeMove == 2 && dragMove == 1){
        updateMouseInGrid();  //calculate the mouse's position in the grid
        if(posY == 0){
          instrumentGrids[zoneY].grid[posX][posY] = 1;
          instrumentGrids[zoneY].grid[posX][posY+1] = 1;
          instrumentGrids[zoneY + 1].grid[posX][posY] = 1;
          instrumentGrids[zoneY + 1].grid[posX+1][posY] = 1;
        }else {
          instrumentGrids[zoneY].grid[posX][posY] = 1;
          instrumentGrids[zoneY + 1].grid[posX][posY-1] = 1;
          instrumentGrids[zoneY + 1].grid[posX][posY] = 1;
          instrumentGrids[zoneY + 1].grid[posX+1][posY] = 1;
        }
        console.log("pattern3 function triggered,", patternMove, shapeMove, dragMove);
        shapeMove = 0;
        dragMove = 0;
        patternMove = 0;
      }
      //pattern4's drag and drop
        if(patternMove == 4 && shapeMove == 1 && dragMove == 1){
          image(img4,mouseX,mouseY,60,120);
          console.log("pattern4",mouseX, mouseY);
        }
        if (patternMove == 4 && shapeMove == 2 && dragMove == 1){
          updateMouseInGrid();  //calculate the mouse's position in the grid
          if(posY == 0){
            instrumentGrids[zoneY].grid[posX][posY+1] = 1;
            instrumentGrids[zoneY].grid[posX+1][posY] = 1;
            instrumentGrids[zoneY].grid[posX+1][posY+1] = 1;
            instrumentGrids[zoneY + 1].grid[posX][posY] = 1;
            instrumentGrids[zoneY + 1].grid[posX][posY+1] = 1;
            instrumentGrids[zoneY + 1].grid[posX+1][posY] = 1;
          }else {
            instrumentGrids[zoneY].grid[posX+1][posY] = 1;
            instrumentGrids[zoneY + 1].grid[posX][posY] = 1;
            instrumentGrids[zoneY + 1].grid[posX][posY-1] = 1;
            instrumentGrids[zoneY + 1].grid[posX+1][posY] = 1;
            instrumentGrids[zoneY + 1].grid[posX+1][posY-1] = 1;
            instrumentGrids[zoneY + 2].grid[posX][posY-1] = 1;
          }
          console.log("pattern4 function triggered,", patternMove, shapeMove, dragMove);
          shapeMove = 0;
          dragMove = 0;
          patternMove = 0;
        }
}

function mouseClicked(){
  updateMouseInGrid();  //calculate the mouse's position in the grid
  if (instrumentGrids[zoneY].grid[posX][posY] == 0 && shapeMove == 0 && dragMove == 0){
    instrumentGrids[zoneY].grid[posX][posY] = 1;
  }else if(instrumentGrids[zoneY].grid[posX][posY] == 1 && shapeMove == 0 && dragMove == 0){
    instrumentGrids[zoneY].grid[posX][posY] = 0;
  }
}

function keyPressed(){

  if(keyCode == 13){
    playGame();
  }

  //add randomnized with key 'r' -xiaohan
  if(key == 'r'){
    if (!playState) {
      randomBoard();
    }
  }
  //add clear with 'w' -xiaohan
  if(key == 'w'){
    if (!playState) {
      clearBoard();
    }
  }


  console.log("keyPressed: "+keyCode + "playState: " + playState);
}

//count the number of live cells around a cell
function countNeighbors(k, x, y){
  let sum = 0;
  let globalX = x;
  let globalY = y + k * instrumentRows;
  let globalCols = instrumentCols;
  let globalRows = instrumentRows * instrumentType;
  for(let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      let col = (globalX + i + globalCols) % globalCols;
      let row = (globalY + j + globalRows) % globalRows;
      sum += instrumentGrids[int(row / instrumentRows)].grid[col][row % instrumentRows];
    }
  }
  sum -= instrumentGrids[k].grid[x][y];
  return sum;
}


//using pattern and part to play instrument
function playInstrument(){

    let valCols = instrumentCols / instrumentUnit;//16
    let valRows = instrumentType;//8
    let playIndex = frameCount % valCols; //indicate at this frame, in which col the sequencer is

    part = new p5.Part();
    phrase = new Array(instrumentType);

    let areaVal = make2DArray(valCols, valRows);  //store the instrument unit's activation state with a matrix
    for(let i = 0; i < valCols; i++){
      for(let j = 0; j < valRows; j++){
        areaVal[i][j] = sumUnit(i,j);
      }
    }
    let patternVal = make2DArray(instrumentType, patternLength);  //store every instrument's type, for example drum - [1,0,0,0,0,0,0,0]
    for(let i = 0; i < instrumentType; i++){
      patternVal[i][0] = areaVal[playIndex][i];
      for(let j = 1; j < patternLength; j++){
        patternVal[i][j] = 0; // fill the silent beat with 0
      }
      phrase[i] = new p5.Phrase('instrument'+i, stepFunction(i), patternVal[i]);  //create a phrase with the pattern
      part.addPhrase(phrase[i]);  ////add phrase to part
    }

    //indicate the sequencer at which col
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(playIndex*resolution*2, 0, resolution*2, leftBuffer.height);
    //play part
    //part.setBPM(120);
    userStartAudio();
    part.start();

    //console.log(areaVal);
    //console.log(patternVal);
    //console.log("time to play: " + playIndex);
    //console.log(part);
}
//sum up the active cell numbers in a unit(containg 4 cells)
function sumUnit(i, j){
  let unitIndex = j;
  let unitOrigin = i * 2;
  let sum = 0;
  for(let x = 0 ; x < instrumentUnit; x++){
    for(let y = 0; y < instrumentUnit; y++){
      sum += instrumentGrids[unitIndex].grid[unitOrigin + x][y];
    }
  }
  if(sum >= 2){
    return 1;
  }else{
    return 0;
  }
}

//return the index of the biggest number in an array
function indexOfMax(arr) {
    var max = arr[0];
    var maxIndex = 0;
    if (arr.length === 0) {
        return -1;
    }
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}


function stepFunction(playIndex){
  var nestedFunction = function onEachStep(time, playbackRate) {
    instrumentSound[playIndex].rate(playbackRate);
    instrumentSound[playIndex].play(time);
  }
  return nestedFunction;
}

function mousePressed(){
  if (960<mouseX && mouseX<1020 && 0<mouseY && mouseY<60){
    shapeMove = 1;
    patternMove = 1;
    console.log("shapePressPattern1",shapeMove, patternMove);
  }
  else if (960<mouseX && mouseX<1005 && 90<mouseY && mouseY<210){
    shapeMove = 1;
    patternMove = 2;
    console.log("shapePressPattern2",shapeMove, patternMove);
  }
  else if (960<mouseX && mouseX<1020 && 240<mouseY && mouseY<330){
    shapeMove = 1;
    patternMove = 3;
    console.log("shapePressPattern3",shapeMove, patternMove);
  }
  else if (960<mouseX && mouseX<1020 && 360<mouseY && mouseY<480){
    shapeMove = 1;
    patternMove = 4;
    console.log("shapePressPattern4",shapeMove, patternMove);
  }
  else{
    shapeMove = 0;
  }
}

function mouseDragged(){
  if(shapeMove == 1){
    dragMove = 1;
  }
  console.log("shapeDrag",shapeMove, patternMove);
}

function mouseReleased(){
  if(shapeMove == 1 && dragMove == 1){
    shapeMove = 2;
  }
  console.log("shapeRelease",shapeMove, patternMove);
}


// sharon's experiment area
//
// sharon s experiment area
