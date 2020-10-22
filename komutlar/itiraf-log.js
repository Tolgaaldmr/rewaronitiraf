const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(' Bu komuta erişim sağlamak için **ADMINISTRATOR** yetkisine **sahip olmalısın.** ')

let data = db.fetch(`itirafkanal_${message.guild.id}`)
if(args[0] !== "ayarla" && args[0] !== "sıfırla") return message.channel.send('Lütfen **ayarla yada **sıfırla** olarak **seçenek belirt.**')

if(args[0] === "ayarla") {
if(data) return message.channel.send('İtiraf log kanalı **daha önce ayarlanmış**')
let kanal = message.mentions.channels.first() || client.channels.get(args[1])
db.set(`itirafkanal_${message.guild.id}`, kanal.id)
message.channel.send('İtiraf kanalı '+kanal+' olarak ayarlandı.')
return
}

if(args[0] === "sıfırla") {
if(!data) return message.channel.send('İtiraf kanalı **daha önce ayarlanmamış.**')    
db.delete(`itirafkanal_${message.guild.id}`)
message.channel.send('Daha önce ayarlanan **itiraf kanalı sıfırlandı.**')
return
}
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};
  
exports.help = {
name: 'itiraf-log',
}
