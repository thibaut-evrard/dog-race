var pos;
var v;

function setup() {
  createCanvas(400,400,WEBGL);
  background(100);
  v = createVector(0,-10,0);
  pos = createVector(0,0,0);
}

function draw() {
  drawCar();
}

function drawCar() {
  push();
    translate(pos.x,pos.y);
    ellipse(0,0,20,20)
  pop();
}

async function forward(amount) {
  for(var i=0; i<amount; i++) {
    pos.add(v);
  }
}

function turn(direction) {
  var amount = direction * (PI/2);
  v.rotate(amount);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}
