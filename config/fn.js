const { GuildMember } = require("discord.js")
const ids = require("./ids.js")

module.exports = {}

module.exports.emote = (name, client) => {
  return client.emojis.cache.find((emoji) => emoji.name.toLowerCase() == name.toLowerCase().replace(/ /g, "_")).toString()
}

module.exports.getUser = (input, message) => {
  if (!input) return message.member
  let target = message.mentions.members.first()
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.tag === input || member.user.id === input || member.user.username === input || (member.nickname !== null && member.nickname === input))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.username.toLowerCase() + "#" + member.user.discriminator === input.toLowerCase() || member.user.username.toLowerCase() === input.toLowerCase() || (member.nickname !== null && member.nickname.toLowerCase() === input.toLowerCase()))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.username.startsWith(input) || member.user.username.toLowerCase().startsWith(input.toLowerCase()))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => (member.nickname !== null && member.nickname.startsWith(input)) || (member.nickname !== null && member.nickname.toLowerCase().startsWith(input.toLowerCase())))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(input.toLowerCase()) || (member.nickname !== null && member.nickname.toLowerCase().includes(input.toLowerCase())))
  }
  return target
}

module.exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports.paginator = async (author, msg, embeds, pageNow, addReactions = true) => {
  if (embeds.length === 1) return
  if (addReactions) {
    await msg.react("⏪")
    await msg.react("◀")
    await msg.react("▶")
    await msg.react("⏩")
  }
  let reaction = await msg.awaitReactions((reaction, user) => user.id == author && ["◀", "▶", "⏪", "⏩"].includes(reaction.emoji.name), { time: 30 * 1000, max: 1, errors: ["time"] }).catch(() => {})
  if (!reaction) return msg.reactions.removeAll().catch(() => {})
  reaction = reaction.first()
  //console.log(msg.member.users.tag)
  if (msg.channel.type == "dm" || !msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
    if (reaction.emoji.name == "◀") {
      let m = await msg.channel.send(embeds[Math.max(pageNow - 1, 0)])
      msg.delete()
      client.paginator(author, m, embeds, Math.max(pageNow - 1, 0))
    } else if (reaction.emoji.name == "▶") {
      let m = await msg.channel.send(embeds[Math.min(pageNow + 1, embeds.length - 1)])
      msg.delete()
      client.paginator(author, m, embeds, Math.min(pageNow + 1, embeds.length - 1))
    } else if (reaction.emoji.name == "⏪") {
      let m = await msg.channel.send(embeds[0])
      msg.delete()
      client.paginator(author, m, embeds, 0)
    } else if (reaction.emoji.name == "⏩") {
      let m = await msg.channel.send(embeds[embeds.length - 1])
      msg.delete()
      client.paginator(author, m, embeds, embeds.length - 1)
    }
  } else {
    if (reaction.emoji.name == "◀") {
      await reaction.users.remove(author)
      let m = await msg.edit(embeds[Math.max(pageNow - 1, 0)])
      client.paginator(author, m, embeds, Math.max(pageNow - 1, 0), false)
    } else if (reaction.emoji.name == "▶") {
      await reaction.users.remove(author)
      let m = await msg.edit(embeds[Math.min(pageNow + 1, embeds.length - 1)])
      client.paginator(author, m, embeds, Math.min(pageNow + 1, embeds.length - 1), false)
    } else if (reaction.emoji.name == "⏪") {
      await reaction.users.remove(author)
      let m = await msg.edit(embeds[0])
      client.paginator(author, m, embeds, 0, false)
    } else if (reaction.emoji.name == "⏩") {
      await reaction.users.remove(author)
      let m = await msg.edit(embeds[embeds.length - 1])
      client.paginator(author, m, embeds, embeds.length - 1, false)
    }
  }
}

module.exports.getMemoryUsage = () => {
  let total_rss = require("fs")
    .readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8")
    .split("\n")
    .filter((l) => l.startsWith("total_rss"))[0]
    .split(" ")[1];
  return (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
}