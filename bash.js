const commands = require('./commands.js');

// prompt the user for input;
process.stdout.write('prompt > ');

// the stdin 'data' event triggers after a user types in an entry following 'prompt >'
process.stdin.on('data', (userInput) => {
   userInput = userInput.toString().trim();
   //evaluatedCmd is a function which will be implemented commands.js
   commands.evaluateCmd(userInput);
});
