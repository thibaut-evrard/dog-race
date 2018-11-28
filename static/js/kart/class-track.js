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
      var obstacle = new colidable("wall",this.scale,x,y);
      this.land.push(obstacle);
      console.log("wall pushed");
     }

    // RED = SPEED
    if(r==255 && g==0 && b==0) {
      var obstacle = new colidable("speed",this.scale,x,y);
      this.land.push(obstacle);
    }

    // BLUE = JUMP
    if(r==0 && g==0 && b==255) {
      var obstacle = new colidable("jump",this.scale,x,y);
      this.land.push(obstacle);
    }

    // GREEN = START
    if(r==0 && g==255 && b==0) {
      this.carStartingPoint = { x: x*this.scale, y: y*this.scale }
    }
  }

  drawTrack(car) {
    minZ = 0;
    for(var i=0; i<this.land.length; i++) {
      this.land[i].draw();
    }
  }
}
