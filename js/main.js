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
    if (this.ghost.getBoundingClientRect().top > 40) {
      this.y -= 10;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveDown() {
    if (this.ghost.getBoundingClientRect().bottom < 600) {
      this.y += 10;
      this.ghost.style.top = this.y - this.width / 2 + "px";
    }
  }
  moveLeft() {
    if (this.ghost.getBoundingClientRect().left > 35) {
      this.x -= 10;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
  moveRight() {
    if (this.ghost.getBoundingClientRect().right < 600) {
      this.x += 10;
      this.ghost.style.left = this.x - this.width / 2 + "px";
    }
  }
}

class Environment {
  constructor() {}
}

class NPC {
  constructor() {}
}

const player = new Ghost();
// const environment = new Environment());
// const npc = new NPC();

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
