// THIS IS THE TRACK CLASS, IT TAKES CARE OF ALL THE NON PLAYER INTERACTIVE OBJECTS IN THE GAME.
// IT ALSO TAKES CARE OF TRANSLATING THE PNG ITO A REAL LIFE MAP

// OBSTACLES CLASS (WALLS)- - - - - - - - - - - - - - - - - - - - - - - - - - -
class track {
  constructor(img) {
    // multiplication rate from PNG to real life
    this.scale = 100;

    // dimetions and looks
    this.length = 100;
    this.width = 100;
    this.height = 30;

    this.wallTexture = loadImage(pathToTextures + '/world/wall.png')
    this.speedTexture = loadImage(pathToTextures + '/world/speed.png')


    this.floorPlan = img;
    this.land = new Array();
    this.clippingDistance = 2000;

    this.carStartingPoint = { x:0, y:0 };
  }

  translateTrack() {
    this.floorPlan.loadPixels();
    for(var y=0; y<this.floorPlan.height; y++) {
      for(var x=0; x<this.floorPlan.width; x++) {
        var pos = (y*this.floorPlan.width + x)*4;
        var r = this.floorPlan.pixels[pos];
        var g = this.floorPlan.pixels[pos+1];
        var b = this.floorPlan.pixels[pos+2];
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

    // BLUE = JUMP
    if(r==0 && g==0 && b==255) {
       var obj = {
         x: x*this.scale,
         y: y*this.scale,
         type: "jump"
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
        texture(this.wallTexture);
        box(this.length, this.width, this.height);
      }
      if(obj.type === "speed") {
        fill(0,0,0,0);
        texture(this.speedTexture);
        plane(this.length, this.width);
      }
      if(obj.type === "jump") {
        fill(0,0,255);
        //texture(this.speedTexture);
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
