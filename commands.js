const fs = require('fs');


function done(output) {
   // console.log(output);
   process.stdout.write(output);
   process.stdout.write('\nprompt > ' );
}

function evaluateCmd(userInput) {
   // full userInput from string to array with split with each item separated by commas.
   const userInputArray = userInput.split(' ');
   // echo, cat, etc.
   const command = userInputArray[0];

   // if first word in command is e.g., 'echo'...
   switch (command) {
      case 'echo':
         // output entire command except the first word as a string, and output a new line with 'prompt >'.
         commandLibrary.echo(userInputArray.slice(1).join(' '));
         break;
      case 'cat':
         commandLibrary.cat(userInputArray.slice(1));
         break;
      case 'head':
         commandLibrary.head(userInputArray.slice(1).join(''));
         break;
      case 'tail':
         commandLibrary.tail(userInputArray.slice(1).join(''));
         break;
      default:
         done('Command not found.');
   }
}

const commandLibrary = {
   // call done(userInput)
   'echo': function (userInput) {
      done(userInput);
   },
   'cat': function(fullPath) {
      // name of the file
      const fileName = fullPath[0];
      // read file name, input file's data into done and output/write in console.
      fs.readFile(fileName, (err, data) => {
         if (err) throw err;
         done(data);
      });
   },
   'head': function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fullPath, (err, data) => {
         if (err) throw err;
         // modify our readFile data to a string so we can use split, and split() items in array where each line is its own item.
         data = data.toString().split('\n');
         // change array length to 10 lines.
         data.length = 10;
         // output file contents.
         done(data.toString());
      });
   },
   'tail': function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fullPath, (err, data) => {
         if (err) throw err;
         data = data.toString().split('\n').reverse();
         data.length = 10;
         done(data.toString());
      });
   }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;

// 1. On load, write out '> prompt' in command line.
// 2. When we have a data event, call evaluateCommand(userInput) in /bash.js.
// 3. evaluateCmd() saves the first word of the userInput and uses a switch statement to check if it is 'echo'.
// 4. If 'echo' is first word, input the remaining string into the comandLibrary's echo() function.
// 5. commandLibrary.echo() calls done(), which takes in the remaining string as an argument, and writes our output after our initial write of '> prompt', and then writes a new line of 'prompt > ', which then repeats our processes.
