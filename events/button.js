const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("interaction", async (interaction) => {
    if (!interaction.isMessageComponent() && interaction.componentType !== "BUTTON") return
    //interaction.reply("Success! Proceeding to run trigger " + interaction.customID + " on " + interaction.message.id, { ephemeral: true })
    let data = interaction.customID.split(":")
    let cmd = data[0]
    let args = data[1]
    args = args.split(";")

    let embed = new MessageEmbed().setColor(0x13E5FC)
    if (cmd == "roletoggle") {
      let role = args[0]
      embed.setTitle("Success!").setDescription(`The <@&${role}> role has been {{action}} you!`)
      if(interaction.member.roles.cache.has(role)) {
        interaction.member.roles.remove(role)
        embed.description = embed.description.replace("{{action}}", "removed from")
      } else {
        interaction.member.roles.add(role)
        embed.description = embed.description.replace("{{action}}", "added to")
      }
      interaction.reply({embeds: [embed], ephemeral: true})
    }
  })
}
