//////////////////////////////////////////////////////////////////////////////////////////
// Game setup
//////////////////////////////

class Game {
  constructor() {
    this.scareAmount = 0;

    ////////////////////////////////////////////////////////////
    // set time in sec
    this.timeTotal = 260; // 2min

    this.intervalTimer = null;
  }

  startScreen() {}

  play() {
    ////////////////////////////////////////////////////////////
    // create logo
    let logo = document.createElement("div");
    logo.id = "logo";
    logo.textContent = "Little Scares";
    document.getElementById("header").appendChild(logo);

    ////////////////////////////////////////////////////////////
    // Timer placement
    let timer = document.createElement("div");
    timer.setAttribute("id", "timer");
    document.getElementById("header").appendChild(timer);

    ////////////////////////////////////////////////////////////
    // Create scare counter
    const scareCounter = document.createElement("div");
    scareCounter.id = "scare-counter";

    const counter = document.createElement("div");
    counter.id = "counter";
    counter.textContent = "Scare Score";
    scareCounter.appendChild(counter);

    const ul = document.createElement("ul");
    ul.className = "indicator";
    ["level1", "level2", "level3", "level4"].forEach((level) => {
      const li = document.createElement("li");
      li.className = level;
      ul.appendChild(li);
    });
    scareCounter.appendChild(ul);

    document.getElementById("header").appendChild(scareCounter);

    this.minutes = Math.floor(this.timeTotal / 60)
      .toString()
      .padStart(2, "0");
    this.seconds = (this.timeTotal % 60).toString().padStart(2, "0");

    this.timer = document.getElementById("timer");
    this.timer.innerText = `${this.minutes}:${this.seconds}`;

    ////////////////////////////////////////////////////////////
    // hidde start screen
    document.getElementById("start").setAttribute("class", "hidden");

    // show ghost and npc
    document.getElementById("ghost").setAttribute("class", "show left");
    document.getElementById("npc").setAttribute("class", "show npc-down");

    // Place boook
    this.book = document.createElement("div");
    this.book.setAttribute("id", "book");
    this.book.setAttribute("class", "book-default");
    board.appendChild(this.book);

    // Setup TV
    this.tvScreen = document.createElement("div");
    this.tvScreen.setAttribute("id", "tv-screen");
    this.tvScreen.setAttribute("class", "tv-screen-default");
    board.appendChild(this.tvScreen);

    // add lamp top left
    this.lampTopLeft = document.createElement("div");
    this.lampTopLeft.setAttribute("id", "lamp-top-left-state");
    this.lampTopLeft.setAttribute("class", "lamp-top-left-manipulated hidden");
    board.appendChild(this.lampTopLeft);

    // add lamp right
    this.lampRight = document.createElement("div");
    this.lampRight.setAttribute("id", "lamp-right-state");
    this.lampRight.setAttribute("class", "hidden");
    board.appendChild(this.lampRight);

    this.startCountdown();
  }

  scareCounterPlus() {
    console.log("Plus");

    switch (this.scareAmount) {
      case 0:
        const level1 = document.querySelector(".level1");
        level1.style.backgroundColor = "#339d3f";
        this.scareAmount++;

        break;
      case 1:
        const level2 = document.querySelector(".level2");
        level2.style.backgroundColor = "#D4D66B";
        this.scareAmount++;
        break;
      case 2:
        const level3 = document.querySelector(".level3");
        level3.style.backgroundColor = "#D6926B";
        this.scareAmount++;
        break;
      case 3:
        const level4 = document.querySelector(".level4");
        level4.style.backgroundColor = "#B74949";
        this.scareAmount++;
        game.winScreen();
        break;
    }
    console.log("Score", this.scareAmount);
  }

  scareCounterMinus() {
    console.log("Minus");
    switch (this.scareAmount) {
      case 1:
        const level1 = document.querySelector(".level1");
        level1.style.backgroundColor = "#56343F";
        this.scareAmount--;
        break;
      case 2:
        const level2 = document.querySelector(".level2");
        level2.style.backgroundColor = "#56343F";
        this.scareAmount--;
        break;
      case 3:
        const level3 = document.querySelector(".level3");
        level3.style.backgroundColor = "#56343F";
        this.scareAmount--;
        break;
    }
    console.log("Score", this.scareAmount);
  }

  startCountdown() {
    console.log("Countdown started");
    let timer = this.timeTotal;
    this.timer.innerText = `${this.minutes}:${this.seconds}`;

    this.intervalTimer = setInterval(() => {
      timer--;

      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
      // console.log(minutes, seconds);

      this.timer.innerText = `${formatTime(minutes)}:${formatTime(seconds)}`;

      if (timer <= 0) {
        // you have lost
        clearInterval(this.intervalTimer);
        this.losingScreen();
      }
    }, 1000);

    function formatTime(time) {
      return time.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    }
  }

  losingScreen() {
    clearInterval(this.intervalTimer);
    //show loosing screen
    let losingScreen = document.getElementById("losing");
    losingScreen.setAttribute("class", "show");

    // hidde npc and ghost
    let ghost = document.getElementById("ghost").remove();
    let npc = document.getElementById("npc").remove();

    // remove interactive object images
    document.getElementById("book").remove();

    // hide bottom bar
    document.getElementById("message").setAttribute("class", "hidden");
    let useraction = document.getElementById("useraction-info");
    useraction.classList.add("hidden");

    // remove top bar
    document.getElementById("logo").remove();
    document.getElementById("timer").remove();
    document.getElementById("scare-counter").remove();
    document.getElementById("header").style.justifyContent = "center";
  }
  winScreen() {
    console.log("You won!");
    clearInterval(this.intervalTimer);

    //show winning screen
    let winningScreen = document.getElementById("winning");
    winningScreen.setAttribute("class", "show");

    // hidde npc and ghost
    let ghost = document.getElementById("ghost").remove();
    let npc = document.getElementById("npc").remove();

    // remove interactive object images
    document.getElementById("book").remove();

    // hide bar
    document.getElementById("message").setAttribute("class", "hidden");
    let useraction = document.getElementById("useraction-info");
    useraction.classList.add("hidden");

    // remove top bar
    document.getElementById("logo").remove();
    document.getElementById("timer").remove();
    document.getElementById("scare-counter").remove();
    document.getElementById("header").style.justifyContent = "center";
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
// Player Class
//////////////////////////////////////////////////////////////////////////////////////////

class Ghost {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.height = 50;
    this.width = 50;

    // character setting
    this.speed = 10;

    this.characterStartup();
  }

  characterStartup() {
    this.ghost = document.createElement("div");
    this.ghost.setAttribute("id", "ghost");
    this.ghost.setAttribute("class", "hidden");

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
    if (this.y > 50) {
      this.y -= this.speed;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveDown() {
    if (this.y < 510) {
      this.y += this.speed;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveLeft() {
    this.ghost.setAttribute("class", "left");
    if (this.x > 70) {
      this.x -= this.speed;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
  moveRight() {
    this.ghost.setAttribute("class", "right");
    if (this.x < 525) {
      this.x += this.speed;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
// Object Class
//////////////////////////////////////////////////////////////////////////////////////////

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
    this.userActionInfo = document.querySelector("#useraction-info");
    this.userActionInfo.innerText = "";
  }

  /////////////////////////////////////////
  // route to indiviual object interaction
  interactWithObject(object) {
    this.infoBoardMessage = document.getElementById("message");
    this.userActionInfo = document.querySelector("#useraction-info");
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
          this.infoBoardMessage.innerText = "Throw down the book";
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

          const tvScreen = document.getElementById("tv-screen");
          tvScreen.setAttribute("class", "tv-screen-manipulated ");

          game.scareCounterPlus();
          break;

        // PEN
        case "pen":
          this.infoBoardMessage.innerText = "The Book is now on the floor!";
          this.wasManipulated = true;

          // Add waypoint and next object to queue of the NPC Class
          npc.actionQueue.push("waypoint");
          npc.actionQueue.push(object.name);

          // book on the floor
          const book = document.getElementById("book");
          book.setAttribute("class", "book-floor");

          game.scareCounterPlus();
          break;

        // Lamp top left
        case "lamp-top-left":
          this.infoBoardMessage.innerText = "The standing lamp is turned off";
          this.wasManipulated = true;

          // Add waypoint and next object to queue of the NPC Class
          npc.actionQueue.push("waypoint");
          npc.actionQueue.push(object.name);

          // light off
          const lampTopLeft = document.getElementById("lamp-top-left-state");
          lampTopLeft.setAttribute("class", "lamp-top-left-manipulated show");

          game.scareCounterPlus();
          break;

        // Lamp right
        case "lamp-right":
          this.infoBoardMessage.innerText = "The light is off!";
          this.wasManipulated = true;

          // Add waypoint and next object to queue of the NPC Class
          npc.actionQueue.push("waypoint");
          npc.actionQueue.push(object.name);

          // lamp off
          let lampRight = document.getElementById("lamp-right-state");
          lampRight.setAttribute("class", "show");

          game.scareCounterPlus();
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
      this.userActionInfo = document.querySelector("#useraction-info");
      this.userActionInfo.innerText = "";
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
// NPC Class
//////////////////////////////////////////////////////////////////////////////////////////

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

    // NPC moving speed
    this.speed = 5;

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
    this.npc.setAttribute("class", "hidden npc-down");

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
    // console.log("Target:", this.targetX, this.targetY);
    // console.log("NPC:", this.currentX, this.currentY);
    // console.log("Current Target Object", this.currentTarget);

    // Only move if isMoving is true
    if (this.isMoving) {
      // Move along X axis
      if (this.targetX > this.currentX) {
        this.currentX += this.speed;
        this.npc.setAttribute("class", "npc-right");
      } else if (this.targetX < this.currentX) {
        this.npc.setAttribute("class", "npc-left");
        this.currentX -= this.speed;
      }

      // Move along Y axis
      if (this.targetY > this.currentY) {
        this.currentY += this.speed;
        this.npc.setAttribute("class", "npc-down");
      } else if (this.targetY < this.currentY) {
        this.currentY -= this.speed;
        this.npc.setAttribute("class", "npc-up");
      }

      this.npc.style.left = this.currentX + "px";
      this.npc.style.top = this.currentY + "px";

      // Check if NPC reached the target
      // Define a small range within which the NPC is considered to have reached its target
      const inReach = Math.abs(this.speed);

      ///////////////////////////////////////////////
      // Check if NPC reached the target
      if (
        Math.abs(this.currentX - this.targetX) <= inReach &&
        Math.abs(this.currentY - this.targetY) <= inReach
      ) {
        console.log(
          `NPC reached target ${this.currentTarget.name}. Array: ${npc.actionQueue}`
        );

        // change state of the interacted object back to default
        this.currentTarget.wasManipulated = false;
        this.isMoving = false; // Stop moving once target is reached
        this.isNavigating = false; // Stop navigating once target is reached

        if (this.currentTarget.name !== "waypoint") {
          this.npcInteracts(this.currentTarget);
        }

        if (
          this.currentTarget.name !== "waypoint" &&
          this.currentTarget.name !== "sofa"
        ) {
          game.scareCounterMinus();
        }

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
          this.npcMoveToSofa();
        }
      } else {
        // If NPC hasn't reached the target, call moveNPC again after a delay
        setTimeout(this.moveNPC.bind(this), 100); // Adjust delay as needed
      }
    }
  }

  npcInteracts(object) {
    switch (object.name) {
      // TV
      case "tv":
        const tvScreen = document.getElementById("tv-screen");
        tvScreen.setAttribute("class", "tv-screen-default");
        break;

      // PEN
      case "pen":
        // book on the floor
        const book = document.getElementById("book");
        book.setAttribute("class", "book-default");

        break;

      // Lamp top left
      case "lamp-top-left":
        const lampLeft = document.getElementById("lamp-top-left-state");
        lampLeft.setAttribute("class", "lamp-top-left-manipulated hidden");
        break;

      // Lamp right
      case "lamp-right":
        let lampRight = document.getElementById("lamp-right-state");
          lampRight.setAttribute("class", "hidden");
        break;
    }
  }
  npcMoveToSofa() {
    // move back to sofa if nothing is left to go to

    this.targetX = sofa.x - this.width / 2;
    this.targetY = sofa.y - this.height / 2;
    this.isMoving = true;

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
          `NPC reached target ${this.currentTarget.name}. Array: ${npc.actionQueue}`
        );

        // change npc sprite position
        this.npc.setAttribute("class", "npc-down");

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

//////////////////////////////////////////////////////////////////////////////////////////
// Game init
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// New player
const player = new Ghost();

//////////////////////////////
// Array with all new objects
const objectCollection = [];

// objects (height, width, y, x, css className)
const lamp1 = new InteractiveObject(50, 50, 130, 100, "lamp-top-left");
const lamp2 = new InteractiveObject(60, 40, 280, 520, "lamp-right");
const tv = new InteractiveObject(50, 260, 450, 300, "tv");
const pen = new InteractiveObject(100, 45, 335, 90, "pen");

const waypoint = new InteractiveObject(10, 10, 240, 290, "waypoint");
const sofa = new InteractiveObject(40, 40, 120, 270, "sofa");

//////////////////////////////
// UX

const game = new Game();
game.startScreen();
// game.startCountdown();

//////////////////////////////
// NPC

const npc = new NPC();

//////////////////////////////////////////////////////////////////////////////////////////

// // Place boook
// let book = document.createElement("div");
// book .setAttribute("id", "book");
// book .setAttribute("class", "book-default");
// board.appendChild(book );

// // Setup TV
// let tvScreen = document.createElement("div");
// tvScreen.setAttribute("id", "tv-screen");
// tvScreen.setAttribute("class", "tv-screen-default");
// board.appendChild(tvScreen);

// // add lamp top left
// let lampTopLeft = document.createElement("div");
// lampTopLeft.setAttribute("id", "lamp-top-left-state");
// lampTopLeft.setAttribute("class", "lamp-top-left-manipulated hidden");
// board.appendChild(lampTopLeft);

//////////////////////////////////////////////////////////////////////////////////////////
// Gane loop update
// ---------------------------
// Controls
//////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////
// Game Restart

let restartBtn = document.getElementById("restart-btn");
restartBtn.onclick = () => {
  // game.restart()
  // game.play();
  window.location.reload();
};

let restartBtnWin = document.getElementById("restart-btn-win");
restartBtnWin.onclick = () => {
  // game.restart()
  // game.play();
  window.location.reload();
};

let startBtn = document.getElementById("start-btn");
startBtn.onclick = () => {
  game.play();
};
