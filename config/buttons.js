const { MessageButton, MessageActionRow } = require("discord.js");
const ids = require("./ids")

const buttons = {
    altspacevr: new MessageButton().setStyle("SUCCESS").setLabel("AltspaceVR").setCustomId(`roletoggle:${ids.platforms.altspacevr}`),
    vrchat: new MessageButton().setStyle("SUCCESS").setLabel("VRChat").setCustomId(`roletoggle:${ids.platforms.vrchat}`),
    recroom: new MessageButton().setStyle("SUCCESS").setLabel("RecRoom").setCustomId(`roletoggle:${ids.platforms.recroom}`),
    rust: new MessageButton().setStyle("SUCCESS").setLabel("Rust").setCustomId(`roletoggle:${ids.platforms.rust}`),
    ff14: new MessageButton().setStyle("SUCCESS").setLabel("Final Fantasy XIV").setCustomId(`roletoggle:${ids.platforms.ff14}`),
    bdo: new MessageButton().setStyle("SUCCESS").setLabel("Black Desert Online").setCustomId(`roletoggle:${ids.platforms.bdo}`),
    vrchurch: new MessageButton().setStyle("SUCCESS").setLabel("VR Church").setCustomId(`roletoggle:${ids.sections.vrchurch}`),
    mmochurch: new MessageButton().setStyle("SUCCESS").setLabel("MMO Church").setCustomId(`roletoggle:${ids.sections.mmochurch}`),
    ff14spoilers: new MessageButton().setStyle("DANGER").setLabel("FFXIV Spoilers").setCustomId(`roletoggle:${ids.others.ff14spoilers}`),
    calendar: new MessageButton().setStyle("DANGER").setLabel("Toggle Calendar View").setCustomId(`roletoggle:${ids.others.calendar}`),
}

const rows = {
    mmop: new MessageActionRow().addComponents(buttons.rust, buttons.ff14),
    vrcp: new MessageActionRow().addComponents(buttons.altspacevr, buttons.vrchat),
    sections: new MessageActionRow().addComponents(buttons.vrchurch, buttons.mmochurch),
    other: new MessageActionRow().addComponents(buttons.ff14spoilers),
    calendar: new MessageActionRow().addComponents(buttons.calendar),
}

module.exports = {
    allbtns: buttons, rows
}
