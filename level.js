var img;
var level;
var map = new Array();

function preload() {
  img = loadImage("./static/level/track.png");
}

function setup() {
  createCanvas(500,500);
  map.push(1);
  //translateTrack();
  //console.log(map.length);
}

function translateTrack() {

  img.loadPixels();
  for(var y=0; y<img.width; y++) {
    for(var x=0; x<img.height; x++) {
      var pos = (y*img.width + x)*4;
      var value = img.pixels[pos] + img.pixels[pos+1] + img.pixels[pos+2];
      if(value == 0) {
         map.push(1);
       }
      else {
        map.push(0);
      }
    }
  }
}

function draw() {
  // background(200);
  // for(var y=0; y<img.height; y++) {
  //   for(var x=0; x<img.width; x++) {
  //     var pos = (y*img.width + x);
  //     if(map == 0) { contine; }
  //     push();
  //       translate(x*100,y*100);
  //       //box(10);
  //     pop();
  //   }
  // }
  // //image(img,0,0,210,210);
}
