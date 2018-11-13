//////////////////////     CLASSES     /////////////////////////////////////////

// CAR OBJECT CLASS- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class car {

  constructor(carStartingPoint) {
    this.length= 20;
    this.width= 20;
    this.speed = 0;
    this.speedMax = 20;
    this.pos = createVector(carStartingPoint.x,carStartingPoint.y);
    this.angle = 0;
    this.angleMax = 0.05;
    this.accelerationRate = 100;
    this.decelerationRate = 15;
    this.angleRate = 0;
    this.angleDeceleration = 1;

    this.boostRate = 1.5;

    //sprite images
    this.annimTimer = 0;
    this.annimDeceleration = 0.8;

    var path = "./static/kart/";
    this.image_3 = loadImage(path+"-3.png");
    this.image_2 = loadImage(path+"-2.png");
    this.image_1 = loadImage(path+"-1.png");
    this.image0 = loadImage(path+"0.png");
    this.image1 = loadImage(path+"1.png");
    this.image2 = loadImage(path+"2.png");
    this.image3 = loadImage(path+"3.png");

    this.sprite = this.image0;
  }

  // handles drawing and annimation of the car
  draw() {
    this.handleAnnimation();
    this.updateModel();
    this.updateRotation();
    this.steer();
    this.updateHitbox();
  }

  handleAnnimation() {
    var amount = map(this.speed,0,7,0,0.1);

    if(keyIsPressed) {
      if(keyIsDown(LEFT_ARROW)) {
        if(this.annimTimer >= -4 ) this.annimTimer -= amount;
      }

      if(keyIsDown(RIGHT_ARROW)) {
        if(this.annimTimer <= 4 ) this.annimTimer += amount;
      }
    }

    if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
      this.annimTimer /= 2;
    }

    // left
    if(this.annimTimer < -0.01) this.sprite = this.image_1;
    if(this.annimTimer < -1) this.sprite = this.image_2;
    if(this.annimTimer < -2) this.sprite = this.image_3;

    // right
    if(this.annimTimer > 0.01) this.sprite = this.image1;
    if(this.annimTimer > 1) this.sprite = this.image2;
    if(this.annimTimer > 2) this.sprite = this.image3;

    // straight
    if(this.annimTimer <= 0.01 && this.annimTimer >= -0.01) {
      this.sprite = this.image0;
    }

  }

  updateHitbox() {
    this.xHitboxMin = this.pos.x - this.length/3;
    this.xHitboxMax = this.pos.x - this.length/3;
    this.yHitboxMin = this.pos.y - this.width/3;
    this.yHitboxMax = this.pos.y - this.width/3;
  }

  // checks if the car collides with the environment
  // IF wall: TRUE, ELSE behavior
  hits(level) {
    //console.log(1);
    for(var i=0; i<level.land.length; i++) {
      var cx = (this.length/2)+(level.length/2);
      var cy = (this.width/2)+(level.width/2);
      var dx = abs(this.pos.x - level.land[i].x);
      var dy = abs(this.pos.y - level.land[i].y);
      if(dx<cx && dy<cy) {
        if(level.land[i].type === "wall") {
          return true;
        }
        if(level.land[i].type === "speed") {
          if(this.speed<45) this.speed *= this.boostRate;
        }
      }
    }
    return false;
  }

  // takes care of the visual part of the car
  updateModel() {
    fill(0,255,0);
    stroke(100);
    push();
    translate(this.pos.x,this.pos.y,17);
    rotate(this.angle);
    rotateX(-PI/2);
    texture(this.sprite);
    plane(40);
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
        this.angleRate = -this.steerFromSpeed();
        //this.angle -= this.angleRate;
      }

      if(keyIsDown(RIGHT_ARROW)) {
        this.angleRate = this.steerFromSpeed();
        //this.angle += this.angleRate;
      }
    }

    this.angle += this.angleRate;
    if((!keyIsDown(UP_ARROW) && !keyIsDown(UP_ARROW)) || this.speed>this.speedMax) {
      this.speed *= 0.99;
    }
    if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
      this.angleRate -= this.angleRate/this.angleDeceleration;
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
    //this.speed = Math.sign(this.speed) * (-2);
  }


}


// ENVIRONMENT OBJECT CLASS (BACKDROP) - - - - - - - - - - - - - - - - - - - - -
class environment {
  constructor() {
    this.length = 10000;
    this.width = 10000;
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
    fill(200);
    //texture(this.pg);
    plane(this.length,this.width);
  }

}


// OBSTACLES CLASS (WALLS)- - - - - - - - - - - - - - - - - - - - - - - - - - -
class track {
  constructor() {
    // multiplication rate from PNG to real life
    this.scale = 100;

    // dimetions and looks
    this.length = 100;
    this.width = 100;
    this.height = 30;
    this.texture = loadImage('static/kart/wal.png')

    this.img = img;
    this.land = new Array();
    this.clippingDistance = 2000;

    this.carStartingPoint = { x:0, y:0 };
  }

  translateTrack() {
    this.img.loadPixels();
    for(var y=0; y<this.img.height; y++) {
      for(var x=0; x<this.img.width; x++) {
        var pos = (y*this.img.width + x)*4;
        var r = this.img.pixels[pos];
        var g = this.img.pixels[pos+1];
        var b = this.img.pixels[pos+2];
        this.storeObjects(r,g,b,x,y);
      }
    }
  }

  storeObjects(r,g,b,x,y) {
    // BLACK = WALL
    if(r==0 && g==0 && b==0) {
      var obj = {
        x: x*this.scale,
        y: y*this.scale,
        type: "wall"
      }
      this.land.push(obj);
     }

    // RED = SPEED
    if(r==255 && g==0 && b==0) {
       var obj = {
         x: x*this.scale,
         y: y*this.scale,
         type: "speed"
       }
       this.land.push(obj);
      }

    // GREEN = START
    if(r==0 && g==255 && b==0) {
      this.carStartingPoint = { x: x*this.scale, y: y*this.scale }
    }
  }

  drawTrack(car) {
    for(var i=0; i<this.land.length; i++) {
      if(this.clipping(car,i)) {
        this.drawModel(this.land[i]);
      }
    }
  }

  // visual part of the wall
  drawModel(obj) {
    noStroke();
    push();
    //translate(-2000,-2000);
    translate(obj.x,obj.y,0.1);
      if(obj.type === "wall") {
        translate(0,0,this.height/2);
        texture(this.texture);
        box(this.length, this.width, this.height);
      }
      if(obj.type === "speed") {
        fill(255,0,0);
        plane(this.length, this.width);
      }
    pop();
  }

  clipping(car,i) {
    var distance = dist(car.pos.x,car.pos.y,this.land[i].x,this.land[i].y);
    if(distance < this.clippingDistance) {
      return true;
    }
    else {
      return false;
    }
  }
}


//////////////////////     GLOBAL VARIABLES     ////////////////////////////////
var cab;
var myEnvironment;
var obstacles = [];

//track vars
var img;
var level;

//////////////////////     P5 METHODS    ///////////////////////////////////////
function preload() {
  img = loadImage("./static/level/track.png");
}

function setup() {
  createCanvas(windowWidth-30,windowHeight-30, WEBGL);
  rectMode(CENTER);

  level = new track();
  level.translateTrack();

  cab = new car(level.carStartingPoint);
  myEnvironment = new environment();
  myEnvironment.setup();

  // for(var i=0; i<200; i++) {
  //   var x = random(-myEnvironment.length/2,myEnvironment.length/2);
  //   var y = random(-myEnvironment.width/2,myEnvironment.width/2);
  //   var newObstacle = new obstacle(x,y);
  //   obstacles.push(newObstacle);
  // }
}

function draw() {
  frameRate(30);
  background(122,250,255);
  level.drawTrack(cab);
  // draws the textured floor
  myEnvironment.draw();

  colider();
  //drawWall();
  //collision();

  // draws the car
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
  camera(x,y, 50, cab.pos.x, cab.pos.y, 40, 0, 0, -1);
}
