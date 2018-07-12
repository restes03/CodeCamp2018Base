'use strict';

delete require.cache['LogHelper.js'];
delete require.cache['data/bot.json'];

/*
 *
 * ==========================================================
 * WARNING -  WARNING - WARNING - WARNING - WARNING - WARNING
 * ==========================================================
 * 
 *               KIDS: DO NOT CHANGE THIS FILE
 
 * ==========================================================
 * WARNING -  WARNING - WARNING - WARNING - WARNING - WARNING
 * ==========================================================
 * 
 */ 

// Set some basic variables
var sourceFile = 'Bootstrap.js'; // helpful for using with logging functions!

// load the logger
var Logger = require('./LogHelper.js'); // simple logging wrapper

// enable debug logging and make our first log entry!
Logger.debugEnabled = true;
Logger.debug(sourceFile, '', 'LogHelper initialized, loading base modules...');

// Load the required modules
var req = require('request');

// These are the files you'll be working in! 
var CodeCampBot1 = require('./Bots/CodeCamp-Bot1'); // load the Code Camp Module


// Create a game
var mazeId = '10:10:SlipperyDevil';
var teamId = 'c7c904b3-ad48-4c44-9d1a-1c5f6982ca62';
req('http://game.code-camp-2018.com/game/new/' + mazeId + '/' + teamId + '/', function(error, response, body) {
    if (undefined != error) {
        console.log('Error creating game: ' + error);
        return;
    }

    var game = JSON.parse(body);
    var gameId = game.url.replace("http://game.code-camp-2018.com:80/game/", "");
    console.log('Game ID ' + gameId + ' created!');

    playGame(gameId, null);
});

function playGame(gameId, engram) {
    var command = CodeCampBot1.takeAction(engram);

    req('http://game.code-camp-2018.com/game/action/'
        + gameId + '?act=' + command.action + '&dir=' + command.direction,
        function(error, response, body) {
            var responseObj = JSON.parse(body);
            playGame(gameId, responseObj.engram);
        }
    );
}

/*
function shutdownGame(gameId) {
    req("http://game.code-camp-2018.com/game/abort/" + gameId);
}
*/