class track {
  constructor(img) {
    this.img = img;
    this.land = new Array();
  }

  translateTrack() {
    this.img.loadPixels();
    for(var y=0; y<this.img.height; y++) {
      for(var x=0; x<this.img.width; x++) {
        var pos = (y*this.img.width + x)*4;
        var value = this.img.pixels[pos] + this.img.pixels[pos+1] + this.img.pixels[pos+2];
        if(value == 0) {
          console.log("x= " + x + ", y= " + y);
           this.land.push(1);
         }
        else {
          this.land.push(0);
        }
      }
    }
    console.log(this.land.length);
  }

  drawTrack() {
    console.log("it");
    background(200);
    for(var y=0; y<this.img.height; y++) {
      for(var x=0; x<this.img.width; x++) {
        var pos = (y*this.img.width + x);
        if(this.land[pos] == 0) { continue; }
        push();
          translate(-250,-250);
          translate(x*10,y*10);
          box(10);
        pop();
      }
    }
  }

}

var img;
var level;
//var land = new Array();

function preload() {
  img = loadImage("./static/level/track.png");
}

function setup() {
  createCanvas(500,500,WEBGL);
  level = new track(img);
  level.translateTrack();

  //translateTrack();
  //console.log(map.length);
}

function translateTrack() {

  // img.loadPixels();
  // for(var y=0; y<img.height; y++) {
  //   for(var x=0; x<img.width; x++) {
  //     var pos = (y*img.width + x)*4;
  //     var value = img.pixels[pos] + img.pixels[pos+1] + img.pixels[pos+2];
  //     if(value == 0) {
  //       console.log("x= " + x + ", y= " + y);
  //        land.push(1);
  //      }
  //     else {
  //       land.push(0);
  //     }
  //   }
  // }
}

function draw() {
  level.drawTrack();
  // background(200);
  // for(var y=0; y<img.height; y++) {
  //   for(var x=0; x<img.width; x++) {
  //     var pos = (y*img.width + x);
  //     if(land[pos] == 0) { continue; }
  //     push();
  //       translate(-250,-250);
  //       translate(x*10,y*10);
  //       box(10);
  //     pop();
  //   }
  // }
}
