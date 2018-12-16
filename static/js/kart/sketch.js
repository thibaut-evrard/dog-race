
//////////////////////     GLOBAL VARIABLES     ////////////////////////////////
var cab;
var myEnvironment;
var obstacles = [];
var minZ;


//track vars
var level;
var img;
var backgroundImage;


//path vars
var pathToTextures = './static/ressources/textures'
var pathToLevel = './static/ressources/level/map'
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
  //myEnvironment.setup();
}

function draw() {
  cab.update();
  frameRate(30);
  background(122,250,255);
  level.drawTrack(cab);
  myEnvironment.draw();
  cab.draw();
  drawCam(cab);

  //colider();
}

//////////////////////     CUSTOM FUNCTIONS    /////////////////////////////////

function drawCam(cab) {
  var camRot = createVector(0,100);
  camRot.rotate(-cab.alpha);//-(cab.v.heading()-(PI/2)));
  var x = cab.pos.x - camRot.x;
  var y = cab.pos.y + camRot.y;
  camera(x,y, cab.pos.z + (50-17), cab.pos.x, cab.pos.y, cab.pos.z + 23, 0, 0, -1);
}
