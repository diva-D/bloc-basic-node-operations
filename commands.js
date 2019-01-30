const fs = require('fs');

// write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

// where we will store our commands
function evaluateCmd(userInput) {
    //pares the user input to understand which command was typed
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default:
            commandLibrary.errorHandler();
    }
}

//where we will store the logic of our commands
const commandLibrary = {
    //the echo command
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;

            // turn data into array and return first n (10) lines
            let lines = [];
            data = data.toString();
            lines = data.split("\n");
            data = lines.slice(0, 10).join("\n");
            done(data);
        });
    },
    "tail": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;

            // turn data into array and return last n (10) lines
            let lines = [];
            data = data.toString();
            lines = data.split("\n");
            data = lines.slice(-10).join("\n");
            done(data);
        });
    },
    "errorHandler": function() {
        done("ERROR: Invalid command");
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;