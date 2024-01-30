let actionQueue = [];

// Player interaction
function playerInteracts(objectId) {
    // Turn off the light
    let object = document.getElementById(objectId);
    object.state = 'off';

    // Add action to queue
    actionQueue.push(objectId);
}

// NPC action
function npcAction() {
    if(actionQueue.length > 0) {
        let action = actionQueue[0]; // Get the first action
        // Move NPC to object and turn on light
        let object = document.getElementById(action);
        object.state = 'on';

        // Remove action from queue
        actionQueue.shift();
    }
}

// Continuously check for NPC actions
setInterval(npcAction, 1000); // NPC checks for actions every second
