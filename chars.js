

const Discord = require("discord.js");

class Character {
    constructor(description, likes, dislikes, height, bio) {
      this.description = description;
      this.likes = likes;
      this.dislikes = dislikes;
      this.height = height;
      this.bio = bio;
    }
    
    newChar(char) {
        Character[char] = new Character;
        msg.channel.send('New character created');
        fs.writeFile('chars.txt', JSON.stringify(Character), (err) => {
            if (err) throw err;
        });
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

    }

    deleteChar(char) {
        delete Character[char];
        msg.channel.send('Character Deleted');
        fs.writeFile('chars.txt', JSON.stringify(Character), (err) => {
            if (err) throw err;
        });
    }
}
function characterInfo(cmd, char, para) {
    if(cmd == ('!newChar'))
        Character.newChar(char)
}



modules.exports = chars;