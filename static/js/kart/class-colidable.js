class colidable {
  constructor(type,scale,x,y) {
    this.clippingDistance = 2000;
    this.scale = scale;
    this.pos = createVector(x*scale,y*scale,0.1);
    this.length = 100;
    this.width = 100;

    switch(type) {
      case "wall":
      this.height = 30;
        this.type = "wall";
        this.center = this.height/2;
        this.build = "box";
        this.texture = loadImage(pathToTextures + '/world/wall.png');
        break;

      case "speed":
      this.height = 0;
      this.type = "speed";
      this.center = 0.1;
      this.build = "plane";
      this.texture = loadImage(pathToTextures + '/world/speed.png');
        break;

      case "jump":
      this.height = 0;
      this.type = "jump";
      this.center = 0.1;
      this.texture = loadImage(pathToTextures + '/world/wall.png');
      this.build = "plane";
        break;

      case "start":
      this.height = 0;
      this.type = "start";
      this.center = 0.1;
      this.texture = loadImage(pathToTextures + '/world/wall.png');
      this.build = plane;
        break;
    }
  }

  draw() {
    if(this.clipping() == true) {
      this.collider();
      push();
        translate(this.pos.x,this.pos.y,this.center);
        texture(this.texture);
        if(this.build == "plane") { plane(this.length, this.width); }
        else { box(this.length,this.width,this.height); }
      pop();
    }
  }

  clipping() {
    var distance = dist(cab.pos.x,cab.pos.y,this.pos.x,this.pos.y);
    if(distance < this.clippingDistance) {
      return true;
    }
    else {
      return false;
    }
  }

  collider() {
    var xHitdist = (cab.length/2) + (this.length/2);
    var yHitdist = (cab.width/2) + (this.width/2);
    var zHitdist = (this.height+3);

    var xDist = abs(cab.pos.x - this.pos.x);
    var yDist = abs(cab.pos.y - this.pos.y);
    var zDist = abs((cab.pos.z-17) - (this.pos.z));

    if(xDist<xHitdist && yDist<yHitdist && zDist<zHitdist) {
      //alert("now");
      console.log("zdist = " + zDist + ", zhDist = " + zHitdist);
      if(this.type == "wall") cab.bump();
      if(this.type == "speed") cab.boost();
      if(this.type == "jump") cab.jump(20);
    }

    else if(xDist<xHitdist && yDist<yHitdist) {
      minZ = this.height+17;
    }



  }
}
