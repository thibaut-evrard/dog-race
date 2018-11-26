
//////////////////////     GLOBAL VARIABLES     ////////////////////////////////
var cab;
var myEnvironment;
var obstacles = [];


//track vars
var level;
var img;
var backgroundImage;


//path vars
var pathToTextures = './static/textures'
var pathToLevel = './static/level/map'
//////////////////////     P5 METHODS    ///////////////////////////////////////

function preload() {
  img = loadImage(pathToLevel + '/track.png');
}

function setup() {
  createCanvas(windowWidth-30,windowHeight-30, WEBGL);
  rectMode(CENTER);

  backgroundImage = loadImage(pathToTextures + '/world/background.png');
  backgroundImage.resize(windowWidth-30,windowHeight-30);

  level = new track(img);
  level.translateTrack();

  cab = new car(level.carStartingPoint);
  myEnvironment = new environment();
  myEnvironment.setup();
}

function draw() {
  frameRate(30);
  background(122,250,255);
  level.drawTrack(cab);
  myEnvironment.draw();

  colider();
  cab.draw();
  drawCam(cab);
}

//////////////////////     CUSTOM FUNCTIONS    /////////////////////////////////

function colider() {
    if(cab.hits(level)) cab.bump();
}

function drawCam(cab) {
  var camRot = createVector(0,100);
  camRot.rotate(-cab.angle);
  var x = cab.pos.x - camRot.x;
  var y = cab.pos.y + camRot.y;
  camera(x,y, cab.pos.z + (50-17), cab.pos.x, cab.pos.y, cab.pos.z + 23, 0, 0, -1);
}
