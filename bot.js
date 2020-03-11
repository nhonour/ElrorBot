
const Discord = require('discord.js');
const chars = require('./chars');
const fs = require('fs');
var auth = require('./auth.json');
const client = new Discord.Client();
const charInfo_commands = ['!setheight', '!setlikes', '!setdislikes', '!setdescription', '!height', '!likes', '!dislikes', '!bio', '!newchar', '!likes', '!deletechar', '!description', '!rip', '!unrip'];

//Lore testing
var loreArray = {};
var despacitos = 1;

fs.readFile('loreFile.txt', function(err, data) {
  if (data !== null)
  loreArray = JSON.parse(data);
})



function startsWithAnyOf(str, beginnings) { 
  // returns true if str starts with any string in array beginnings
  for (var b of beginnings) {
    if (str.startsWith(b)) return true;
  }
  return false;
}


client.on('ready', () => {
  console.log('I am ready!');
});


// Create an event listener for messages
client.on('message', msg => {


  //-------------------------------------------------------------------------------------- Commands (Lore) ---------------------------------------------------------------------------------------


  // Displays current commands
  if(msg.content.startsWith("!help") || msg.content.startsWith("!commands"))
    msg.channel.send('```Current commands are:\n !lore !addlore !overwritelore !listlore !deletelore\n !newchar !setheight !setlikes !setdislikes !setdescription !deletechar\n !height !likes !dislikes !description !bio !rip !unrip\n !urpriest !keenmind !ohbaby !beepboop !meow !thisissosad\n !cowards !valhalla\n And a few more secret ones!```');


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
    var loreOnly = msg.content.substring(words[0].length + words[1].length + 2);

    if(words[1] in loreArray)
    {
      loreArray[words[1]] = loreOnly;
      msg.channel.send('Lore rewritten');
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

    var allLore = "";
    for (const list of lists)
    { 
      allLore += `${list}\n`;
    }
    msg.channel.send(allLore);
  }


  
  // --------------------------------------------------------------------------------------------------- Character Info -----------------------------------------------------------------------------------
  if(startsWithAnyOf(msg.content, charInfo_commands)) {
    var words = msg.content.split(" ");
    var cmd = words[0];
    var char = words[1];
    var para = msg.content.substring(words[0].length + words[1].length + 2);

    if (cmd === '!newchar')
      chars.newChar(char, msg.channel);
    if(cmd === '!cowards')
      chars.cowards(msg.channel);
    if(cmd === '!valhalla')
      chars.valhalla(msg.channel);
    else
      chars.characterInfo(cmd, char, para, msg.channel);
  }

  if(msg.content === '!cowards') {
    chars.cowards(msg.channel);
  }

  if(msg.content === '!valhalla') {
    chars.valhalla(msg.channel);
  }



  // ---------------------------------------------------------------------------------------- You have entered the 「ｍｅｍｅ　ｚｏｎｅ」 ----------------------------------------------------------------------

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

  // Allow only myself and Karl to yeet people out of voice chat
  if(msg.content.startsWith('!yeet'))
  {
    
    if(msg.author.id === ((auth.nick-id)||(auth.karl-id)))
    {
      
      const yeetee = msg.mentions.users.first();
      if(yeetee)
      {
        const member = msg.guild.member(yeetee);
        if(member)
          member.setVoiceChannel(null);
      }    
    }

    else {
      const infidel = msg.author;
      if(infidel) {
        const member = msg.guild.member(infidel);
        if(member) 
          member.setVoiceChannel(null);
      }
      msg.channel.send('You are not worthy');
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
  
  // Bingrid links
  if(msg.content === '!ohbaby')
  {
    msg.channel.send({embed: {
      color: 3447003,
      title: "Bingrid Thunderbone Music",
      fields: [{
        name: "The Mighty Thunderbones",
        value: "[soundcloud](https://soundcloud.com/callum-seuss/the-mighty-thunderbones)"
      },
      {
        name: "Digginoth the Vile",
        value: "[soundcloud](https://soundcloud.com/callum-seuss/drigginoth-the-vile)"
      }
    ]}});
  }

  // Zach bullshit
  if(msg.content === '!beepboop')
  {
    msg.channel.send({embed: {
      color: 3447003,
      fields: [{
        name:"Guts' Poems",
        value: "[google doc](https://docs.google.com/document/d/1Ns1X1af_sjNZ1PCKVq4QsRnSnK8YImz7zaSB681DKig/edit)"
      }]
    }});
  }

  // Suicidal cat scribbles
  if(msg.content === '!meow')
  {
    msg.channel.send({embed: {
      color: 3447003,
      fields: [{
        name:"Chonky cat",
        value: "[google doc](https://docs.google.com/document/d/1AK3ANpOfyZfOWzF_HiGtnSbNj65Ld6-TxDNfyxrJrI8/edit?usp=sharing)"
      }]
    }});
  }

  // Song roulette
  if(msg.content === '!thisissosad')
  {
    var memeSong = Math.floor((Math.random()*10)+1);

    if( (despacitos === 2) || ((despacitos > 3) && (memeSong === 8))) {
      msg.channel.send(';;play https://www.youtube.com/watch?v=OBwS66EBUcY');
    }

    if((despacitos === 3) || ((despacitos > 3) && (memeSong === 3))) {
      msg.channel.send(';;play https://www.youtube.com/watch?v=XUhVCoTsBaM');
      
    }
    
    else {
      msg.channel.send(';;play https://www.youtube.com/watch?v=kJQP7kiw5Fk');
    }

    despacitos++;
  }

  // They're all good bots bront
  if(msg.content.includes("good bot"))
  {
    msg.channel.send("\\\\(^ヮ^)/");
  }

  if(msg.content === '!dave') {
    msg.channel.send('Dave and dave and the bois and bois and squad and the fam and the crew and homies and the gang and the goons and the team');
  }

  
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me

client.login(auth.token);
