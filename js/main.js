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
    this.name = name;

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
    // this.object.classList.add(this.name);
    this.object.setAttribute("id", this.name);

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
  interactWithObject(object) {
    this.infoBoardMessage = document.getElementById("message");
    this.userActionInfo = document.querySelector(".useraction-info");
    // this.userActionInfo.style.display = "flex";

    if (!this.wasManipulated) {
      switch (object) {
        case "tv":
          // console.log("TV");
          this.infoBoardMessage.innerText = "Interfere with the television";
          this.userActionInfo.innerText = "» Press Space «";

          break;
        case "lamp-top-left":
          // console.log("Lamp top right");
          this.infoBoardMessage.innerText = "Turn off the Standing lamp";
          this.userActionInfo.innerText = "» Press Space «";
          break;
        case "lamp-right":
          // console.log("Lamp right");
          this.infoBoardMessage.innerText = "Turn off the light";
          this.userActionInfo.innerText = "» Press Space «";
          break;
        case "pen":
          // console.log("PEN");
          this.infoBoardMessage.innerText = "Throw down the pen";
          this.userActionInfo.innerText = "» Press Space «";
          break;
      }
    }
  }

  /////////////////////////////////////////
  // Scare Scare Scare Scare Scare

  triggerScare(object) {
    // console.log(this.wasManipulated);
    // console.log("passed Man:", manipulationStatus);

    if (!this.wasManipulated) {
      switch (object.name) {
        // TV
        case "tv":
          this.infoBoardMessage.innerText = "The TV has a bug now";
          this.wasManipulated = true;

          // Add waypoint and next object to queue of the NPC Class
          npc.actionQueue.push("waypoint");
          npc.actionQueue.push(object.name);

          // call NPC to take action
          // npc.npcAction(object.name);

          break;

        // PEN
        case "pen":
          this.infoBoardMessage.innerText = "The Pen is on the floor!";
          this.wasManipulated = true;

          // Add waypoint and next object to queue of the NPC Class
          npc.actionQueue.push("waypoint");
          npc.actionQueue.push(object.name);

          // call NPC to take action
          // npc.npcAction(object.name);
          break;

        // Lamp top left
        case "lamp-top-left":
          this.infoBoardMessage.innerText = "The standing lamp is turn off";
          this.wasManipulated = true;

          // Add waypoint and next object to queue of the NPC Class
          npc.actionQueue.push("waypoint");
          npc.actionQueue.push(object.name);

          // call NPC to take action
          // npc.npcAction(object.name);
          break;

        // Lamp right
        case "lamp-right":
          this.infoBoardMessage.innerText = "The light is off!";
          this.wasManipulated = true;

          // Add waypoint and next object to queue of the NPC Class
          npc.actionQueue.push("waypoint");
          npc.actionQueue.push(object.name);

          // call NPC to take action
          // npc.npcAction(object.name);
          break;
      }

      // The NPC need to act now, handing over the object that was triggered
      console.log("new Object Array", npc.actionQueue);

      if (!npc.isMoving) {
        console.log("objects on trigger", npc.actionQueue);
        let nextTarget = npc.actionQueue[0];
        npc.setTarget(nextTarget === "waypoint" ? waypoint : object);
      }

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

    // Position once triggered
    this.currentX = this.x;
    this.currentY = this.y;

    this.targetX = null;
    this.targetY = null;

    // moving speed
    this.speed = 10;

    // get the current Target object later in the code
    this.currentTarget = null;
    this.setTarget = this.setTarget.bind(this); // make it available beyond itself

    // predefined intermediat Point
    this.waypointX = waypoint.x;
    this.waypointY = waypoint.y;

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

  setTarget(object) {
    console.log("Queue:", this.actionQueue);

    if (object.name === "waypoint") {
      this.targetX = this.waypointX;
      this.targetY = this.waypointY;
    } else if (npc.actionQueue.length === 0) {
      this.targetX = this.x - this.height / 2;
      this.targetY = this.y - this.width / 2;
    } else {
      this.targetX = object.x - this.width / 2;
      this.targetY = object.y - this.height / 2;
    }

    this.currentTarget = object;
    console.log("NPC walks to:", this.currentTarget.name);

    this.isMoving = true; // Start moving when a new target is set
    this.isNavigating = true; // Start navigating to the new target
    this.currentTarget = object; // Store the current target object
    this.moveNPC(); // Start moving
    npc.actionQueue.shift();
  }

  moveNPC() {
    console.log("Target:", this.targetX, this.targetY);
    console.log("NPC:", this.currentX, this.currentY);
    // Only move if isMoving is true
    if (this.isMoving) {
      // Move along X axis
      if (this.targetX > this.currentX) {
        this.currentX += this.speed;
      } else if (this.targetX < this.currentX) {
        this.currentX -= this.speed;
      }

      // Move along Y axis
      if (this.targetY > this.currentY) {
        this.currentY += this.speed;
      } else if (this.targetY < this.currentY) {
        this.currentY -= this.speed;
      }

      this.npc.style.left = this.currentX + "px";
      this.npc.style.top = this.currentY + "px";

      // Check if NPC reached the target
      // Define a small range within which the NPC is considered to have reached its target
      const inReach = Math.abs(this.speed);

      // Check if NPC reached the target
      if (
        Math.abs(this.currentX - this.targetX) <= inReach &&
        Math.abs(this.currentY - this.targetY) <= inReach
      ) {
        console.log(
          `NPC reached target at (${this.targetX}, ${this.targetY}). Array: ${npc.actionQueue}.`
        );

        // change state of the interacted object back to default
        this.currentTarget.wasManipulated = false;
        this.isMoving = false; // Stop moving once target is reached
        this.isNavigating = false; // Stop navigating once target is reached

        // Move to the next target if any
        if (this.actionQueue.length > 0) {
          let nextTarget = this.actionQueue[0]; // Get the next targets name and pass turn it into an object in next line
          let nextObject = objectCollection.find((obj) => {
            return obj.name === nextTarget; // Return the condition
          }); // Find the next object based on its name

          console.log("Next Target:", nextTarget);
          this.setTarget(nextObject); // Set the next target
        } else {
          console.log("No more targets");
          this.npcMoveToSofa()
        }
      } else {
        // If NPC hasn't reached the target, call moveNPC again after a delay
        setTimeout(this.moveNPC.bind(this), 100); // Adjust delay as needed
      }
    }
  }
  npcMoveToSofa() {
    // move back to sofa if nothing is left to go to
    
    this.targetX = sofa.x - this.width / 2;
    this.targetY = sofa.y - this.height / 2;
    this.isMoving = true

    if (this.isMoving) {
      // Move along X axis
      if (this.targetX > this.currentX) {
        this.currentX += this.speed;
      } else if (this.targetX < this.currentX) {
        this.currentX -= this.speed;
      }

      // Move along Y axis
      if (this.targetY > this.currentY) {
        this.currentY += this.speed;
      } else if (this.targetY < this.currentY) {
        this.currentY -= this.speed;
      }

      this.npc.style.left = this.currentX + "px";
      this.npc.style.top = this.currentY + "px";

      // Check if NPC reached the target
      // Define a small range within which the NPC is considered to have reached its target
      const inReach = Math.abs(this.speed);

      // Check if NPC reached the target
      if (
        Math.abs(this.currentX - this.targetX) <= inReach &&
        Math.abs(this.currentY - this.targetY) <= inReach
      ) {
        console.log(
          `NPC reached target at (${this.targetX}, ${this.targetY}). Array: ${npc.actionQueue}.`
        );

        // change state of the interacted object back to default
        this.currentTarget.wasManipulated = false;
        this.isMoving = false; // Stop moving once target is reached
        this.isNavigating = false; // Stop navigating once target is reached

       
      } else {
        // If NPC hasn't reached the target, call moveNPC again after a delay
        setTimeout(this.moveNPC.bind(this), 100); // Adjust delay as needed
      }
    }
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

const waypoint = new InteractiveObject(10, 10, 240, 290, "waypoint");
const sofa = new InteractiveObject(40, 40, 120, 270, "sofa");

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
        interactiveObject.triggerScare(interactiveObject); // Trigger the method when spacebar is pressed and player is in an interactive area
      }
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
        objElm.interactWithObject(objElm.name);
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
