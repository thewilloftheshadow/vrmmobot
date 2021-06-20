const { fn } = require("../../config/")
module.exports = {
    name: "ping",
}

module.exports.run = async (message, args, client) => {
    const m = await message.channel.send("Ping?");
    let embed = {
      title:`:ping_pong: **Pong!**`,
      author:{
        name:client.user.tag,
        icon_url:client.user.avatarURL()
      },
      fields:[
        {
          name:`**Latency:** \u200b \u200b \u200b \u200b \u200b \u200b \u200b`,
          value:`\`${m.createdTimestamp - message.createdTimestamp}ms\``,
          inline:true
        },
        {
          name:`**API Latency:**`,
          value:`\`${Math.round(client.ws.ping)}ms\``,
          inline:true
        },
        {
          name:`**Memory Usage:**`,
          value:`\`${fn.getMemoryUsage()}mb\``,
          inline:true
        }
      ]
    }
    m.edit({ content: null, embeds: [embed] })
}
