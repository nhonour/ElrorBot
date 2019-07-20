/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
var fs = require('fs');

// Create an instance of a Discord client
const client = new Discord.Client();

//Lore testing
var loreArray = {};

fs.readFile('loreFile.txt', function(err, data) {
  if (data != null);
  loreArray = JSON.parse(data);
})

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});



// Create an event listener for messages
client.on('message', msg => {

  
  
  if (msg.content.startsWith("!addlore"))
  {
    var words = msg.content.split(" ");
    var loreOnly = msg.content.substring(words[0].length + words[1].length + 2);

    if(words[1] in loreArray)
    {
      loreArray[words[1]] += ` ${loreOnly}`;
      msg.channel.send('Lore updated');
      fs.writeFile('loreFile.txt', JSON.stringify(loreArray), (err) => {
        if (err) throw err;
      });
    } //----------

    

    else
    {
      if (words.length <= 2)
      {
        msg.channel.send('You fuckwad, put some lore in there');
      }
      else
      {
        loreArray[words[1]] = loreOnly;
        msg.channel.send('Added lore!');
        fs.writeFile('loreFile.txt', JSON.stringify(loreArray), (err) => {
          if (err) throw err;
        }); 
      } 
    } //----------

    /*-------------------------------------
              Save to File here
    --------------------------------------*/
  }

  if (msg.content.startsWith("!overwritelore"))
  {
    var words = msg.content.split(" ");

    if(words[1] in loreArray)
    {
      loreArray[words[1]] = loreOnly;
    }

    else
    {
      if (words.length <= 2)
      {
        msg.channel.send('You fuckwad, put some lore in there');
      }
      else
      {
        loreArray[words[1]] = loreOnly;
        msg.channel.send('Added lore!');
        fs.writeFile('loreFile.txt', JSON.stringify(loreArray), (err) => {
          if (err) throw err;
        }); 
      } 

      
      }
    }
  






  if (msg.content.startsWith("!lore"))
  {
    var words = msg.content.split(" ");

    if(words[1] in loreArray)
    {
      msg.channel.send(loreArray[words[1]]);
    }
    else
      msg.channel.send('This entry does not have any lore');
  }


  if (msg.content.startsWith("!deletelore"))
  {
    var words = msg.content.split(" ");

    if(words[1] in loreArray)
    {
      delete loreArray[words[1]];
      msg.channel.send(`he's dead jim`);
      fs.writeFile('loreFile.txt', JSON.stringify(loreArray), (err) => {
        if (err) throw err;
      }); 
    } 

    
    else
      msg.channel.send(`you can't kill that which is already dead`)
    
  }

  // If the message is "ping"
  if (msg.content === '!ping') {
    // Send "pong" to the same channel
    msg.channel.send('pong');
  }

  if(msg.content === '!keenmind')
  {
    var rand = Math.floor((Math.random()*3)+1)
      if(rand === 1)
        msg.channel.send('Which way is north???');
        
      if(rand===2)
        msg.channel.send('How many hours until the next sunset???');
      
      if(rand === 3)
        msg.channel.send(`What's happened in the last month???`);
  }

});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NjAwODg4NzYyNjAzNDA1MzQ5.XTIaSA.Wgd5_LL4qH0BQuh_aSti5V4Yfi8');
