
const Discord = require('discord.js');
var fs = require('fs');

// Create an instance of a Discord client
const client = new Discord.Client();

//Lore testing
var loreArray = {};
var charStats = {};

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


  // Displays current commands
  if(msg.content.startsWith("!help") || msg.content.startsWith("!commands"))
    msg.channel.send('Current commands are:\n !lore\n !addlore (Adds on to the end of lore file)\n !overwritelore (Overwrites the lore file)\n !listlore\n !deletelore\n !urpriest');


  // Adds on to or creates notes for lore
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
    } 

    else
    {
      if (words.length <= 2) 
      {
        msg.channel.send('You fuckwad, put some lore in there');
      }
      else // Create new lore entry
      {
        loreArray[words[1]] = loreOnly;
        msg.channel.send('Added lore!');
        fs.writeFile('loreFile.txt', JSON.stringify(loreArray), (err) => {
          if (err) throw err;
        }); 
      } 
    } 

  }

  // Creates or completely overwrites lore in lore
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
  

  // Displays the lore in the given location
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


  // Deletes the lore entry
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

  //Dislplay all of the lore entries
  if (msg.content.startsWith('!listlore'))
  {
    const lists = Object.keys(loreArray);
    for (const list of lists)
    {
      msg.channel.send(list);
    }
  }




  // If the message is "ping"
  if (msg.content === '!ping') {
    // Send "pong" to the same channel
    msg.channel.send('pong');
  }


  // --------------------------------- You have entered the 「ｍｅｍｅ　ｚｏｎｅ」 ----------------------------------

  // Keen mind is a good feat
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

  // Allow only myself to yeet people out of voice chat
  if(msg.content.startsWith('!yeet'))
  {
    
    if(msg.author.id === ('140280291582279681'))
    {
      
      const yeetee = msg.mentions.users.first();
      if(yeetee)
      {
        const member = msg.guild.member(yeetee);
        if(member)
          member.setVoiceChannel(null);
      }    
    }
  }
  
  // Correct people about the correct name for a pencil 
  if(msg.content.includes("pencil"))
    msg.channel.send(`paint sword*`);


  // If people want to know more about the urpreists... or the communist manifesto
  if(msg.content.startsWith('!urpriest'))
  {
    var rand = Math.floor((Math.random()*2)+1);
    if(rand == 1)
      msg.channel.send(`For more info on the Ur-Priests: https://tinyurl.com/m6gme24`);
    if(rand == 2)
      msg.channel.send(`For more info on the Ur-Priests: https://tinyurl.com/y3xq3lr9`);
  }
  

});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NjAwODg4NzYyNjAzNDA1MzQ5.XTIaSA.Wgd5_LL4qH0BQuh_aSti5V4Yfi8');
