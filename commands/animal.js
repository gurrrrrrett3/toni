module.exports = {
    name: 'animal',
    description: "Plays the tree game",
    execute(message, args){


// 8 nights of Hanukkah 2016 Examples
// Night 5: Animal Guessing Game
// https://www.reddit.com/r/dailyprogrammer/comments/34asls/20150429_challenge_212_intermediate_animal_guess/
// Daniel Shiffman
// http://codingrainbow.com/

//don't forget about the ;!

// Node has data and a yes (left) and no (right) answer
function Node(data, y, n) {
    this.data = data;
    this.yes = y;
    this.no = n;
  }
  
  var fs = require("fs");
  // Add some encouragement
  var words = ["That's great!", "You know your animals!", "Let's play again!", "One more animal!"];
  var word = words[Math.floor(Math.random() * words.length)];
  
  // Giving thanks
  var thanks = ["Thanks!", "Nice one!"];
  var thank = thanks[Math.floor(Math.random() * words.length)];
  
  // Play again
  var playAgain = ["Let's play again!", "That was fun, let's play again!"]
  var playAgainLoad = playAgain[Math.floor(Math.random() * words.length)];
  
  // Read in an animal decision tree
  var tree = fs.readFileSync('tree.json');
  var root = JSON.parse(tree);
  var node;
  
  message.channel.send('Welcome to the animal game!\nThis game is a lot of fun!\nThink of an animal,\nthen I will try to guess it!\nIf I do not know know your animal you can teach me!\nReady to play?!');
  
  // Play the game
  //while (react("Do you want to play?")) {
    node = root;
    go();
  //}
  
  function go() {
    // If it's not a "terminal" node (i.e. animal)
    while (node.yes && node.no) {
      // Ask the question: Yes or No?
      if (react(node.data)) {
        node = node.yes;
      } else {
        node = node.no;
      }
    }
    // We're at the end, guess!
    if (!react("Is it a " + node.data + "?")) {
      // Wrong!
      train(node);
    } else {
      // Right!
      message.channel.send(word);
    }
  }
  
  function react(question) {
    message.channel.send(question)
    message.react("✅").then(message.react("❎"))
  
    const filter = (reaction, user) => {
        return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
            console.log(reaction.user + " , " + reaction.emoji.name)
            if (reaction.emoji.name === '✅') {
                return "Y";
            } else {
                return "N";
            }
        })
        .catch(collected => {
            message.reply('Not a valid answer, or you took to long to respond');
        });
  }

  function askQuestion(question) {
    message.channel.send(question)
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });
    
    collector.on('collect', m => {
       return m.content;
    });
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });
  }

  // Ask a question, return true for yes

  
  // Train a node to get the right answer
  function train(node) {
    // The wrong guess
    var guess = node.data;
    // What is it?
    var answer = askQuestion("Ok, what are you? ");
    // Get a new question?
    var question = askQuestion("Suggest a yes/no question to distinguish a " + guess + " from a " + answer + ".\n");
    node.data = question;
    // Yes or no for that question
    if (react("Answer for a " + answer + ": " + question)) {
      node.yes = new Node(answer);
      node.no = new Node(guess);
      message.channel.send(thank);
      message.channel.send("Great! Now I know about " + answer + "s !");
      message.channel.send(playAgainLoad);
    } else {
      node.yes = new Node(guess);
      node.no = new Node(answer);
      //adding it here did not gen a thanks
      //console.log(thank);
    }
    // Save back to the file
    var tree = JSON.stringify(root, null, 2);
    fs.writeFileSync('tree.json', tree);
  }
    }
}