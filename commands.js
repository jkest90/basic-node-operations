const fs = require('fs');

function done(output) {
   process.stdout.write(output);
   process.stdout.write('\nprompt > ' );
}

function evaluateCmd(userInput) {
   const userInputArray = userInput.split(' ');
   const command = userInputArray[0];

   // if first word in command is e.g., 'echo'...
   switch (command) {
      case 'echo':
         // output entire command except the first word as a string, and output a new line with 'prompt >'.
         commandLibrary.echo(userInputArray.slice(1).join(' '));
         break;
   }
}

const commandLibrary = {
   // call done(userInput)
   'echo': function (userInput) {
      done(userInput);
   }
};



module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;

// 1. On load, write out '> prompt' in command line.
// 1. When we have a data event, call evaluateCommand(userInput) in /bash.js.
// 2. evaluateCmd() saves the first word of the userInput and uses a switch statement to check if it is 'echo'.
// 3. If 'echo' is first word, input the remaining string into the comandLibrary's echo() function.
// 4. commandLibrary.echo() calls done(), which takes in the remaining string as an argument, and writes our output after our initial write of '> prompt', and then writes a new line of 'prompt > ', which then repeats our processes.
