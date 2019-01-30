const commands = require("./commands.js");

// prompt the user for input
process.stdout.write('prompt > ');

// The stdin 'data' event triggers after a user types in a line
process.stdin.on('data', (userInput) =>{
// # 3
    userInput = userInput.toString().trim();

    commands.evaluateCmd(userInput);
});