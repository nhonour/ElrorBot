

const Discord = require("discord.js");

var character_dict = {};

class Character {
    constructor(description, likes, dislikes, height, bio) {
      this.description = description;
      this.likes = likes;
      this.dislikes = dislikes;
      this.height = height;
      this.bio = bio;
    }
    
    setDescription(cmd) {

    }

    setLikes(cmd) {

    }

    setDislikes(cmd) {

    }

    setHeight(cmd, para) {
        
    }

    bio() {
        console.log(this.bio)
    }

    deleteChar() {
        delete character_dict[char];
        msg.channel.send('Character Deleted');
        /*fs.writeFile('charinfo.txt', JSON.stringify(Character), (err) => {
            if (err) throw err;
        });*/
    }

    
}

function characterInfo(cmd, char, para) {

    if(cmd == ('!bio'))
        character_dict[char].bio();
    if(cmd == ('!setDescription'))
        character_dict[char].bio(para);
}

function newChar(char, channel) {
    character_dict[char] = new Character("a", "b", "c", "d", "e");
    channel.send('New character created');
    console.log(Character);
    /*fs.writeFile('charinfo.txt', JSON.stringify(Character), (err) => {
        if (err) throw err;
    });*/
}




module.exports = {Character: Character, characterInfo: characterInfo, newChar: newChar}