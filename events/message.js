const Discord = require("discord.js")
const config = require("../config/")

const cooldowns = new Discord.Collection()
const prefix = config.prefix

module.exports = (client) => {
  //When receiving a message
  client.on("message", (message) => {
    
    if (message.author.bot) return //Ignore bots and dms    

    //If user mentions bot
    //if (message.content.startsWith(`<@!${client.user.id}>`)) return message.reply(`Hey! My prefix is ${prefix}, you can ask for \`${prefix}help\` if you ever need.`)

    if (!message.content.startsWith(prefix)) return
    //if (blacklists.includes(`/${message.author.id}/`)) return message.channel.send("Blacklisted users can't use any command!")

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command =
      client.commands.get(commandName) || //DO NOT PUT ;
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return //If such command doesn't exist, ignore it

    //Execute command if everything is ok
    try {
      command.run(message, args, client)
    } catch (error) {
      console.error(error)
      message.reply("Something went wrong...")
    }
  })
}
