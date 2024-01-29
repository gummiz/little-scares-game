class Ghost {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.heigth = 30;
    this.width = 30;
    this.characterStartup();
  }

  characterStartup() {
    this.ghost = document.createElement("div");
    this.ghost.setAttribute("id", "ghost");

    // Ghost Size
    this.ghost.style.width = this.width + "px";
    this.ghost.style.height = this.heigth + "px";

    // place Ghost
    this.board = document.getElementById("board");
    this.board.appendChild(this.ghost);

    // set position of Ghost
    this.ghost.style.position = "absolute";
    this.ghost.style.top = this.x - this.heigth / 2 + "px";
    this.ghost.style.left = this.y - this.width / 2 + "px";
  }

  moveUp() {
    if (this.ghost.getBoundingClientRect().top > 45) {
      this.y -= 10;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveDown() {
    if (this.ghost.getBoundingClientRect().bottom < 525) {
      this.y += 10;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveLeft() {
    if (this.ghost.getBoundingClientRect().left > 50) {
      this.x -= 10;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
  moveRight() {
    if (this.ghost.getBoundingClientRect().right < 535) {
      this.x += 10;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
}

//////////////////////////////
// Object Class
//////////////////////////////
class InteractiveObject {
  constructor(width, height, posY, posX, name) {
    this.width = width;
    this.height = height;
    this.y = posY;
    this.x = posX;

    // option for custome class
    this.customClass = name;

    this.addObject();
  }

  addObject() {
    // create new Element + add default class
    this.object = document.createElement("div");
    this.object.setAttribute("class", "interactiveObj");

    // add custom class
    this.object.classList.add(this.customClass);

    // size
    this.object.style.width = this.width + "px";
    this.object.style.height = this.height + "px";
    // console.log(this.customClass, "Width", this.object.width);
    // console.log(this.customClass, "Height", this.object.height);

    // position top/left
    this.object.style.position = "absolute";
  
    this.object.style.top = this.y - (this.height / 2)+ "px";
    this.object.style.left = this.x - (this.width / 2) + "px";

    // place object
    this.board = document.getElementById("board");
    this.board.appendChild(this.object);

    console.log(this.object);
  }
}

//////////////////////////////
// NPC Class
//////////////////////////////

class NPC {
  constructor() {}
}

//////////////////////////////
// Game init
//////////////////////////////

const player = new Ghost();
const lamp1 = new InteractiveObject(60, 60, 90, 70, "lamp-top-left");
// const npc = new NPC();

//////////////////////////////
//////////////////////////////

//Controls
window.addEventListener("keydown", function (event) {
  console.log("Ghost Position:", this.ghost.getBoundingClientRect());
  switch (event.key) {
    case "ArrowUp":
      player.moveUp();
      break;
    case "ArrowDown":
      player.moveDown();
      break;
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "Spacebar":
      player.interact();
      break;
  }
});
