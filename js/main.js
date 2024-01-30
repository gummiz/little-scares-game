class Ghost {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.height = 30;
    this.width = 30;

    // character setting
    this.speed = 8;

    this.characterStartup();
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

    // collision checker
    this.hasCollision = false;

    // manipulation checker
    this.wasManipulated = false;

    // Object creator
    this.addObject();

    // this.infoBoard.innerHTML = ""
  }

  /////////////////////////////////////////
  // create the Object
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

  /////////////////////
  // default Infoboard
  resetInfoboard() {
    // remove Interaction message
    this.infoBoardMessage = document.getElementById("message");
    this.infoBoardMessage.innerText = "";

    // remove Spacebar message
    this.userActionInfo = document.querySelector(".useraction-info");
    this.userActionInfo.innerText = "";
  }

  /////////////////////////////////////////
  // route to indiviual object interaction
  interactWithObject(objectName) {
    this.infoBoardMessage = document.getElementById("message");
    this.userActionInfo = document.querySelector(".useraction-info");
    // this.userActionInfo.style.display = "flex";

    if (!this.wasManipulated) {
      switch (objectName) {
        case "tv":
          console.log("TV");
          this.infoBoardMessage.innerText = "Interfere with the television";
          this.userActionInfo.innerText = "» Press Space «";

          break;
        case "lamp-top-left":
          console.log("Lamp top right");
          this.infoBoardMessage.innerText = "Turn off the Standing lamp";
          this.userActionInfo.innerText = "» Press Space «";
          break;
        case "lamp-right":
          console.log("Lamp right");
          this.infoBoardMessage.innerText = "Turn off the light";
          this.userActionInfo.innerText = "» Press Space «";
          break;
        case "pen":
          console.log("PEN");
          this.infoBoardMessage.innerText = "Throw down the pen";
          this.userActionInfo.innerText = "» Press Space «";
          break;
      }
    }
  }

  /////////////////////////////////////////
  // Scare Scare Scare Scare Scare

  triggerScare(objectName) {
    // console.log(this.wasManipulated);
    // console.log("passed Man:", manipulationStatus);

    if (!this.wasManipulated) {
      switch (objectName.customClass) {
        // TV
        case "tv":
          console.log("TV has a bug now");
          this.infoBoardMessage.innerText = "The TV has a bug now";
          this.wasManipulated = true;

          // Add action to queue of the NPC Class
          npc.actionQueue.push(objectName.customClass);

          // call NPC to take action
          // npc.npcAction(objectName.customClass);

          break;

        // PEN
        case "pen":
          console.log("Pen is on the floor");
          this.infoBoardMessage.innerText = "The Pen is on the floor!";
          this.wasManipulated = true;

          // Add action to queue of the NPC Class
          npc.actionQueue.push(objectName.customClass);

          // call NPC to take action
          // npc.npcAction(objectName.customClass);
          break;

        // Lamp top left
        case "lamp-top-left":
          console.log("Standing lamp is turn off");
          this.infoBoardMessage.innerText = "The standing lamp is turn off";
          this.wasManipulated = true;

          // Add action to queue of the NPC Class
          npc.actionQueue.push(objectName.customClass);

          // call NPC to take action
          // npc.npcAction(objectName.customClass);
          break;

        // Lamp right
        case "lamp-right":
          console.log("The light is off!");
          this.infoBoardMessage.innerText = "The light is off!";
          this.wasManipulated = true;

          // Add action to queue of the NPC Class
          npc.actionQueue.push(objectName.customClass);

          // call NPC to take action
          // npc.npcAction(objectName.customClass);
          break;
      }

      // The NPC need to act now, handing over the object that was triggered
      npc.npcInstruct(objectName);

      // remove Spacebar message
      this.userActionInfo = document.querySelector(".useraction-info");
      this.userActionInfo.innerText = "";
    }
  }
}

//////////////////////////////
// NPC Class
//////////////////////////////

class NPC {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.y = 120;
    this.x = 270;

    this.speed = 0;

    // Action Queue
    this.actionQueue = [];

    this.createNPC();
  }

  createNPC() {
    // create new NPC + add id
    this.npc = document.createElement("div");
    this.npc.setAttribute("id", "npc");

    // size
    this.npc.style.width = this.width + "px";
    this.npc.style.height = this.height + "px";

    // position top/left
    this.npc.style.position = "absolute";

    this.npc.style.top = this.y - this.height / 2 + "px";
    this.npc.style.left = this.x - this.width / 2 + "px";

    // place npc
    this.board = document.getElementById("board");
    this.board.appendChild(this.npc);
  }

  npcInstruct(objectName) {
    // NPC takes action and checks what is in the Action Queue. If there is something then move
    // to the first Element in the this.actionQueue Array:
    // 1. turn the manipulation back to false
    // 2. return this value back to the global scope

    console.log("IN Queue:", this.actionQueue);
    // console.log("IN Object:", objectName);

    console.log("IN Manipulated:", objectName.wasManipulated);

    // setTimeout(() => {

    // }, 13000);

    if (this.actionQueue.length > 0) {
      // as long something is in the queue, move to the next item in queue
      let objectInQueue = this.actionQueue[0]; // Get the first action
      // console.log("Action", objectInQueue)

      // console.log("Object Position:", objectCollection.lamp1.getBoundingClientRect())
      this.objectTarget = document.getElementById(objectInQueue);
      console.log("Target:", this.objectTarget);
      console.log(
        "Target Position:",
        this.objectTarget.getBoundingClientRect()
      );

      this.npcMoveTo(objectInQueue);
      // console.log("OUT Queue:", this.actionQueue);
      // console.log("OUT Object:", objectName);
      // console.log("OUT Manipulated:", objectName.wasManipulated);
      // return objectName.wasManipulated;
    } else {
      // if there is no more objects that need to be changed back, the NPC should walk back to the couch
    }
  }

  npcMoveTo(objectInQueue) {
    console.log("NPC walks to:", objectInQueue);

    // if NPC touches Object trigger npcChangeManipilation()
  }

  npcChangeManipilation() {
    // objectName.wasManipulated = false;
    // Remove action from queue
    // this.actionQueue.shift();
  }
}

//////////////////////////////
// Game init
//////////////////////////////

//////////////////////////////
// New player
const player = new Ghost();

//////////////////////////////
// Array with all new objects
const objectCollection = [];

// objects (height, width, y, x, css className)
const lamp1 = new InteractiveObject(80, 80, 100, 80, "lamp-top-left");
const lamp2 = new InteractiveObject(60, 60, 270, 530, "lamp-right");
const tv = new InteractiveObject(140, 260, 480, 300, "tv");
const pen = new InteractiveObject(100, 65, 335, 70, "pen");

//////////////////////////////
// NPC

const npc = new NPC();

//////////////////////////////
// Gane loop update
// ---------------------------
// Controls
//////////////////////////////

window.addEventListener("keydown", function (event) {
  let isPlayerInteracting = false;

  // Player Movement handling
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
      const interactiveObject = objectCollection.find(
        (objElm) => objElm.hasCollision
      );
      if (interactiveObject) {
        // console.log("Trigger scare method");

        interactiveObject.triggerScare(interactiveObject); // Trigger the method when spacebar is pressed and player is in an interactive area
      }

      objectCollection.forEach((objElm) => {});
  }

  //////////////////////////////
  // Interaction with Objects
  //////////////////////////////

  // Set isMessageVisible to false at the beginning of each interaction check
  setMessageVisible = false;

  // Iterate over objectCollection
  objectCollection.forEach((objElm) => {
    // check collision
    if (
      player.x - player.width / 2 < objElm.x + objElm.width / 2 &&
      player.x + player.width / 2 > objElm.x - objElm.width / 2 &&
      player.y - player.height / 2 < objElm.y + objElm.height / 2 &&
      player.y + player.height / 2 > objElm.y - objElm.height / 2
    ) {
      if (!objElm.hasCollision) {
        objElm.interactWithObject(objElm.customClass);
        objElm.hasCollision = true; // Interaction occurs only once per overlap
      }
      setMessageVisible = true; // Message is visible because there's an overlap
    } else {
      if (objElm.hasCollision) {
        objElm.resetInfoboard(); // Clear the message if not within an interactive area
        objElm.hasCollision = false; // Leaving the object resets interaction state
      }
    }
  });
});

//////////////////////////////
// NPC Action

// setInterval(()=> npc.npcAction() , 1000);
