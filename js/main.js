class Ghost {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.height = 30;
    this.width = 30;
    this.characterStartup();

    this.speed = 8;
  }

  characterStartup() {
    this.ghost = document.createElement("div");
    this.ghost.setAttribute("id", "ghost");

    // Ghost Size
    this.ghost.style.width = this.width + "px";
    this.ghost.style.height = this.height + "px";

    // place Ghost
    this.board = document.getElementById("board");
    this.board.appendChild(this.ghost);

    // set position of Ghost
    this.ghost.style.position = "absolute";
    this.ghost.style.top = this.x - this.height / 2 + "px";
    this.ghost.style.left = this.y - this.width / 2 + "px";
  }

  moveUp() {
    if (this.ghost.getBoundingClientRect().top > 45) {
      this.y -= this.speed;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveDown() {
    if (this.ghost.getBoundingClientRect().bottom < 525) {
      this.y += this.speed;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveLeft() {
    if (this.ghost.getBoundingClientRect().left > 50) {
      this.x -= this.speed;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
  moveRight() {
    if (this.ghost.getBoundingClientRect().right < 535) {
      this.x += this.speed;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
}

//////////////////////////////
// Object Class
//////////////////////////////
class InteractiveObject {
  constructor(height, width, posY, posX, name) {
    this.width = width;
    this.height = height;
    this.y = posY;
    this.x = posX;

    // option for custome class
    this.customClass = name;

    // interaction checker
    this.hasInteracted = false;

    // Object creator
    this.addObject();
  }

  addObject() {
    // create new Element + add default class
    this.object = document.createElement("div");
    this.object.setAttribute("class", "interactiveObj");

    // add custom class
    // this.object.classList.add(this.customClass);
    this.object.setAttribute("id", this.customClass);

    // size
    this.object.style.width = this.width + "px";
    this.object.style.height = this.height + "px";

    // position top/left
    this.object.style.position = "absolute";

    this.object.style.top = this.y - this.height / 2 + "px";
    this.object.style.left = this.x - this.width / 2 + "px";

    // place object
    this.board = document.getElementById("board");
    this.board.appendChild(this.object);

    // push object to the array objectColletion
    objectCollection.push(this);
  }

  // route to indiviual object interaction
  interactWithObject(objectName) {
    // Lamp 1
    switch (objectName) {
      case "tv":
        console.log("TV");
        break;
        case "lamp-top-left":
          console.log("Lamp top right");
          break
        case "lamp-right":
          console.log("Lamp right");
          break
        case "pen":
          console.log("PEN");
          break
        
      }
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

// New player
const player = new Ghost();

// Array with all new objects
const objectCollection = [];

// objects (height, width, y, x, css className)
const lamp1 = new InteractiveObject(80, 80, 100, 80, "lamp-top-left");
const lamp2 = new InteractiveObject(60, 60, 270, 530, "lamp-right");
const tv = new InteractiveObject(140, 260, 480, 300, "tv");
const pen = new InteractiveObject(100, 65, 335, 70, "pen");

console.log(objectCollection);
// const npc = new NPC();

//////////////////////////////
// Gane loop update
// ---------------------------
// Controls
//////////////////////////////

window.addEventListener("keydown", function (event) {
  //   console.log("Ghost Position:", this.ghost.getBoundingClientRect());
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
    case " ":
      player.interact();
      break;
  }
  //////////////////////////////
  // Interaction with Objects
  //////////////////////////////

  // Add a flag that indicates if an interaction is happening
  objectCollection.forEach((objElm) => {
    if (
      !objElm.hasInteracted &&
      player.x - player.width / 2 < objElm.x + objElm.width / 2 &&
      player.x + player.width / 2 > objElm.x - objElm.width / 2 &&
      player.y - player.height / 2 < objElm.y + objElm.height / 2 &&
      player.y + player.height / 2 > objElm.y - objElm.height / 2
    ) {
      // console.log("Interaction with", objElm.customClass);
      objElm.hasInteracted = true; // Set the flag indicating interaction has occurred

      // start interaction method
      objElm.interactWithObject(objElm.customClass);
    } else if (
      player.x + player.width / 2 < objElm.x - objElm.width / 2 ||
      player.x - player.width / 2 > objElm.x + objElm.width / 2 ||
      player.y + player.height / 2 < objElm.y - objElm.height / 2 ||
      player.y - player.height / 2 > objElm.y + objElm.height / 2
    ) {
      objElm.hasInteracted = false; // Reset the interaction flag when no longer overlapping
    }
  });
});
