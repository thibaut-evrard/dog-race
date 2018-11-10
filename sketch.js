//////////////////////     CLASSES     /////////////////////////////////////////

// CAR OBJECT CLASS- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class car {


  constructor() {
    this.length= 20;
    this.width= 20;
    this.speed = 0;
    this.speedMax = 30;
    this.pos = createVector(0,0);
    this.angle = 0;
    this.angleMax = 0.02;
    this.accelerationRate = 100;
    this.decelerationRate = 40;

    // hitbox
    this.xHitboxMin = this.pos.x - this.length/2;
    this.xHitboxMax = this.pos.x - this.length/2;
    this.yHitboxMin = this.pos.y - this.width/2;
    this.yHitboxMax = this.pos.y - this.width/2;
    this.img = loadImage("static/care.png");
  }

  // handles drawing and annimation of the car
  draw() {
    this.updateModel();
    this.updateRotation();
    this.steer();
    this.updateHitbox();
  }

  updateHitbox() {
    this.xHitboxMin = this.pos.x - this.length/3;
    this.xHitboxMax = this.pos.x - this.length/3;
    this.yHitboxMin = this.pos.y - this.width/3;
    this.yHitboxMax = this.pos.y - this.width/3;
  }

  hits(obstacle) {
    //console.log(1);
      var cx = (this.length/2)+(obstacle.length/2);
      var cy = (this.width/2)+(obstacle.width/2);
      var dx = abs(this.pos.x - obstacle.x);
      var dy = abs(this.pos.y - obstacle.y);

      if(dx<cx && dy<cy) {
        return true;
      }
      else {
        //console.log("false");
        return false;
      }
    // if(this.xHitboxMax > obstacle.xHitboxMin && this.xHitboxMin < obstacle.xHitboxMax) {
    //     if(this.yHitboxMax > obstacle.yHitboxMin && this.yHitboxMin < obstacle.yHitboxMax) {
    //       return true;
    //     }
    //     else return false;
    //   }
    //   else return false;
  }

  // takes care of the visual part of the car
  updateModel() {
    fill(0,255,0);
    stroke(100);
    push();
    translate(this.pos.x,this.pos.y,15);
    rotate(this.angle);
    rotateX(-PI/2);
    texture(this.img);
    plane(40);
    //box(20);
    pop();
  }

  // takes care of rotating the car sprite around
  updateRotation() {
    var v = createVector(0,-this.speed);
    v.rotate(this.angle);
    this.pos.add(v);
  }

  // makes the car respond to user input
  steer(key) {
    //console.log("steering");
    if(keyIsPressed) {
      if(keyIsDown(UP_ARROW)) {
        if(this.speed == 0) { this.speed+=0.1; }
        else if(this.speed < this.speedMax) { this.speed += (this.speedMax-this.speed)/this.accelerationRate; }
      }
      if(keyIsDown(DOWN_ARROW)) {
        if(this.speed > 0) this.speed -= this.speed/this.decelerationRate;
      }
      if(keyIsDown(LEFT_ARROW)) {
        this.angle -= this.steerFromSpeed();
      }

      if(keyIsDown(RIGHT_ARROW)) {
        this.angle += this.steerFromSpeed();
      }
    }
    if(!keyIsDown(UP_ARROW) && !keyIsDown(UP_ARROW)) {
      this.speed *= 0.99;
    }
  }

  // subfunction of steer, handles the angle of steering depending on speed
  steerFromSpeed() {
    if(this.speed<1) {
      return this.angleMax*this.speed;
    }
    else {
      return this.angleMax;
    }
  }

  // when the car collides a wall.
  bump() {
    this.speed = -2;
  }


}


// ENVIRONMENT OBJECT CLASS (BACKDROP) - - - - - - - - - - - - - - - - - - - - -
class environment {
  constructor() {
    this.length = 2000;
    this.width = 2000;
    this.pg;
  }

  setup() {
    this.pg = createGraphics(200,200);
    this.pg.background(0,250,100);
    this.pg.fill(0,200,100);
    this.pg.noStroke();
    for(var x=0; x<20; x++) {
      for(var y=0; y<20; y++) {
        this.pg.ellipse(x*10,y*10,5,5);
      }
    }
  }

  draw() {
    texture(this.pg);
    plane(this.length,this.width);
  }

}


// OBSTACLES CLASS (WALLS)- - - - - - - - - - - - - - - - - - - - - - - - - - -
class obstacle {
  constructor(x,y) {
    this.length = 50;
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y;
    this.img = loadImage('static/wal.png')

    // hitbox
    this.xHitboxMin = this.x - this.length/2;
    this.xHitboxMax = this.x - this.length/2;
    this.yHitboxMin = this.y - this.width/2;
    this.yHitboxMax = this.y - this.width/2;
  }

  // visual part of the wall
  drawModel() {
    texture(this.img);
    push();
    translate(this.x,this.y,this.height/2);
    box(this.length, this.width, this.height);
    pop();
  }
}


//////////////////////     GLOBAL VARIABLES     ////////////////////////////////
var cab;
var myEnvironment;
var obstacles = [];

//////////////////////     P5 METHODS    ///////////////////////////////////////
function setup() {
  createCanvas(windowWidth-30,windowHeight-30, WEBGL);
  rectMode(CENTER);

  cab = new car();
  myEnvironment = new environment();
  myEnvironment.setup();

  for(var i=0; i<50; i++) {
    var x = random(-myEnvironment.length/2,myEnvironment.length/2);
    var y = random(-myEnvironment.width/2,myEnvironment.width/2);
    var newObstacle = new obstacle(x,y);
    obstacles.push(newObstacle);
  }
}

function draw() {
  background(122,250,255);

  // draws the textured floor
  myEnvironment.draw();

  for(var i=0; i<obstacles.length; i++) {
    obstacles[i].drawModel();
    if(cab.hits(obstacles[i])) cab.bump();
  }
  //drawWall();
  //collision();

  // draws the car
  cab.draw();
  drawCam(cab);
}

//////////////////////     CUSTOM FUNCTIONS    /////////////////////////////////

// function collision() {
//   var cx = (wall.length/2)+(car.length/2);
//   var cy = (wall.width/2)+(car.width/2);
//   var dx = abs(car.pos.x - wall.x);
//   var dy = abs(car.pos.y - wall.y);
//
//   if(dx<cx && dy<cy) {
//     carBump();
//   }
// }

function drawCam(cab) {
  var camRot = createVector(0,100);
  camRot.rotate(-cab.angle);
  var x = cab.pos.x - camRot.x;
  var y = cab.pos.y + camRot.y;
  camera(x,y, 50, cab.pos.x, cab.pos.y, 40, 0, 0, -1);
}