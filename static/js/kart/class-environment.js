//THIS IS THE ENVIRONMENT CLASS, IT TAKES CARE OF GIVING A FLAT FLOOR TO THE LEVEL
// ! MAYBE IT SHOULD ALSO TAKE CARE OF BUILDING THE LEVEL IN THE FUTURE !

// ENVIRONMENT OBJECT CLASS (BACKDROP) - - - - - - - - - - - - - - - - - - - - -
class environment {
  constructor() {
    this.length = 10000;
    this.width = 10000;
    this.textureSample = loadImage(pathToTextures + "/world/floor.png");
    this.texture = createImage(500,500);
  }

  setup() {

  }

  draw() {
    //fill(200);
    texture(this.textureSample);
    plane(this.length,this.width);
  }

}
