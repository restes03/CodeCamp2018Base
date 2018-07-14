'use strict';

var command = {
    action: null,
    direction: null,
};

var imFacing = "north";
var lookedRight = false;
var lookedLeft = false;

function openExit(direction, sight) {
    var exits = getExits(sight);

    if (direction == "north" && exits.north) {
        return true;
    }
    if (direction == "south" && exits.south) {
        return true;
    }
    if (direction == "east" && exits.east) {
        return true;
    }
    if (direction == "west" && exits.west) {
        return true;
    }

    return false;
}

function getExits(sight) {
    var exits = {
        north: false,
        south: false,
        east: false,
        west: false,
    };
    
    if (sight.includes("exit")) {
        if (sight.includes("north")) {
            exits.north=true;
        }
        if (sight.includes("south")) {
            exits.south=true;
        }
        if (sight.includes("east")) {
            exits.east=true;
        }
        if (sight.includes("west")) {
            exits.west=true;
        }
    }

    return exits;
}

function getRight(direction) {
    if ("north" == direction) {
        return "east";
    }
    if ("east" == direction) {
        return "south";
    }
    if ("south" == direction) {
        return "west";
    }
    if ("west" == direction) {
        return "north";
    }
    return "north"; // don't know!   
}

function getLeft(direction) {
    if ("north" == direction) {
        return "west";
    }
    if ("east" == direction) {
        return "north";
    }
    if ("south" == direction) {
        return "east";
    }
    if ("west" == direction) {
        return "south";
    }
    return "south"; // don't know!   
}

module.exports = {
    /**
     * @param {Object} engram
     * @return {Object} command
     */
    takeAction: function(engram) {
        // *********************************************************************
        // CODE HERE!
        // *********************************************************************

        if (null == engram) {
            command.action='look';
            command.direction=imFacing;
        } else {
                // let's see what we saw
                if (!engram.sight.toLowerCase().includes('lava') &&
                    !engram.sight.toLowerCase().includes('wall')) {
                    // no lava, no wall, that's good!

                    // go in the direction we're facing
                    if (openExit(getRight(imFacing), engram.sight)) {
                        imFacing = getRight(imFacing);
                        command.action = "move";
                        command.direction = imFacing;
                    } else if (openExit(imFacing, engram.sight)) {
                        command.action = "move";
                        command.direction = imFacing;
                    } else if (openExit(getLeft(imFacing), engram.sight)) {
                        imFacing = getLeft(imFacing);
                        command.action = "move";
                        command.direction = imFacing;
                    } else {
                        imFacing = getRight(getRight(imFacing));
                        command.action = "move";
                        command.direction = imFacing;
                    }
                } else {
                    if (!lookedRight) {
                        lookedRight = true;
                        command.action = "look";
                        command.direction = getRight(imFacing);
                    } else if (!lookedLeft) {
                        lookedRight = true;
                        command.action = "look";
                        command.direction = getLeft(imFacing);
                    } else {
                        command.action = "move"; // turn around!
                        command.direction = getRight(getRight(imFacing));
                        imFacing = command.direction;
                    }
                }
            }
        
        /*
        else if (command.action == "move") {
            command.action = "look";
        } else { // we just looked at something
            if (!engram.sight.toLowerCase().includes('lava') &&
                !engram.sight.toLowerCase().includes('wall')) {
                command.action = "move";
            } else {
                switch (command.direction) { // go in circles!
                    case "north": {
                        command.direction = "east";
                        break;
                    }
                    case "east": {
                        command.direction = "south";
                        break;
                    }
                    case "south": {
                        command.direction = "west";
                        break;
                    }
                    case "west": {
                        command.direction = "north";
                        break;
                    }
                }
            }
        }
        */

        return command;

        // *********************************************************************
        // STOP CODING!
        // *********************************************************************
    },
};
