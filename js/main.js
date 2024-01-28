class Ghost {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.heigth = 1;
    this.width = 1;
    this.characterStartup()
  }

  characterStartup() {
    const ghost = document.createElement("div")
    ghost.setAttribute("id", "ghost")
    
    // Ghost Size
    

  }

  moveUp() {
  }
  moveDown() {
    /*...*/
  }
}

class Environment {
  constructor(/*...*/) {}
}

class NPC {
  constructor(/*...*/) {}
}


const player = new Ghost();
// const environment = new Environment());
// const npc = new NPC();


//Controll 
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            player.moveUp();
            break;
        case 'ArrowDown':
            player.moveDown();
            break;
    }
});
