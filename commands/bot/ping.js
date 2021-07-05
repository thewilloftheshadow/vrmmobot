const { MessageEmbed } = require("discord.js");
const { fn, ids } = require("../../config/")
module.exports = {
    name: "ping",
}

module.exports.run = async (message, args, client) => {
    switch (message.channel.id) {
      case "847951589397364788":
        role = ids.platforms.altspacevr
      break;
      case "847951610030063666":
        role = ids.platforms.vrchat
      break;
      case "847656377026609203":
        role = ids.platforms.rust
      break;
      case "847656430826815488":
        role = ids.platforms.bdo
      break;
      case "847656406236135444":
        role = ids.platforms.ff14
      break;
      case "852251076240474122":
        role = "852237682427560007"
      break;
    }
    message.channel.send({content: `<@&${role}>`, embeds: [new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))]})
}
