const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("interaction", async (interaction) => {
    if (!interaction.isMessageComponent() && interaction.componentType !== "BUTTON") return
    console.log(interaction.customID)
    //interaction.reply("Success! Proceeding to run trigger " + interaction.customID + " on " + interaction.message.id, { ephemeral: true })
    let data = interaction.customID.split(":")
    let cmd = data[0]
    let args = data[1]
    args = args.split(";")
    console.log(data, args)

    let embed = new MessageEmbed().setColor(0x13E5FC)
    if (cmd == "buttonrole") {
      let roleID = args[0]
      interaction.reply({})
    }
  })
}
