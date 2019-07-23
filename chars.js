

const Discord = require("discord.js");
const fs = require('fs');

var character_dict = {};

/*fs.readFile('charinfo.txt', function(err, data) {
    if (data != null);
    character_dict = JSON.parse(data);
  });
*/



class Character {
    constructor(description, likes, dislikes, height, bio) {
      this.c_description = description;
      this.c_likes = likes;
      this.c_dislikes = dislikes;
      this.c_height = height;
      this.c_bio = bio;
    }
    
    setDescription(char, para, channel) {
        this.c_description = para;
        channel.send('Description updated');
        writeChar(char);
    }

    description(channel) {
        if ((this.c_description === " " || this.c_description === ""))
            channel.send(`This character has no description`);
        else if(this.c_description)
            channel.send(this.c_description);
    }

    setLikes(char, para, channel) {
        this.c_likes = para;
        channel.send('Likes updated');
        writeChar(char);
    }

    likes(channel) {
        if ((this.c_likes===" ") || this.c_likes === "")
            channel.send(`This character has no likes`);
        else if(this.c_likes)
            channel.send(this.c_likes);

    }

    setDislikes(char, para, channel) {
        this.c_dislikes = para;
        channel.send('Dislikes updated');
        writeChar(char);
    }

    dislikes(channel) {
        if ((this.c_dislikes===" " || this.c_dislikes === ""))
            channel.send(`This character has no dislikes`);
        else if(this.c_dislikes)
            channel.send(this.c_dislikes);
    }

    setHeight(char, para, channel) {
        this.c_height = para;
        channel.send('Height updated');        
        writeChar(char);
    }

    height(channel) {
        if ((this.c_height === " " || this.c_height === ""))
            channel.send(`This character has no height set`);
        else if(this.c_height)
            channel.send(this.c_height);
    }

    bio(channel) {
        if((this.c_height) && (this.c_description) && (this.c_likes) && (this.c_dislikes))
            channel.send(`Height: ${this.c_height}\nDescription: ${this.c_description}\nLikes: ${this.c_likes}\nDislikes: ${this.c_dislikes}`);
        else
            channel.send(`Finish filling out this character's bio first`);
    }

    deleteChar(char, channel) {
        delete character_dict[char];
        channel.send('Character Deleted');
        writeChar(char);
    }

    
}

function characterInfo(cmd, char, para, channel) {
    if(character_dict[char])
    {
        if(cmd === ('!bio'))
            character_dict[char].bio(channel);
        if(cmd === ('!description'))
            character_dict[char].description(channel)
        if(cmd === ('!setdescription'))
            character_dict[char].setDescription(char, para, channel);
        if(cmd === ('!likes'))
            character_dict[char].likes(channel);
        if(cmd === ('!setlikes'))
            character_dict[char].setLikes(char, para, channel);
        if(cmd === ('!dislikes'))
          character_dict[char].dislikes(channel);
        if(cmd === '!setdislikes')
           character_dict[char].setDislikes(char, para, channel);
        if(cmd === '!height')
          character_dict[char].height(channel);
        if(cmd === '!setheight')
          character_dict[char].setHeight(char, para, channel);
        if(cmd === '!deletechar')
          character_dict[char].deleteChar(char, channel);
    }
    else
        channel.send(`This character does not exist, please make a file with !newchar (character name)`);
}

function newChar(char, channel) {
    character_dict[char] = new Character(" ", " ", " ", " ", " ");
    channel.send('New character created');
    writeChar(char);
}

function writeChar(char)
{
    fs.writeFile('charinfo.txt', JSON.stringify(character_dict), (err) => {
        if (err) throw err;
    });
}




module.exports = {Character: Character, characterInfo: characterInfo, newChar: newChar}