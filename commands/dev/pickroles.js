const Discord = require("discord.js")
const shuffle = require("shuffle-array")
const config = require("../../config/")
const fs = require("fs")

module.exports = {
  name: "pickroles",
}

module.exports.run = async (message, args, client) => {
  if (!["439223656200273932"].includes(message.author.id)) return
  message.channel.send({content: `Hey there! Welcome to the VR/MMO Church Mega-Server!\n** **`})
  message.channel.send({content: `**Ping Roles**\nThese roles can be pinged by anyone in the role's matching channel by simply using \`-ping\`.\nTo claim a role, simply click on the button for it!`, components: [config.buttons.rows.vrcp, config.buttons.rows.mmop]})
  //message.channel.send({content: `** **\n**Section Roles**\nBy default, you are only able to see the basic community channels. If you would like to gain access to the specialized channels for the different parts of the server, use the buttons below!`, components: [config.buttons.rows.sections]})
  message.channel.send({content: `**Other Roles**\nThese roles are for misc things that we have in this server!`, components: [config.buttons.rows.other, config.buttons.rows.calendar]})
}
