const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
moment.locale('tr') 

exports.run = async(client, message, args) => {
message.delete()

let data = db.fetch(`itirafkanal_${message.guild.id}`)
let kanal = await db.fetch(`itirafkanal_${message.guild.id}`)
if(!data) return message.channel.send('İtiraf kanalı **ayarlanmamış.**')

let itiraf = args.slice(0).join(' ')
if(!itiraf) return message.channel.send('Lütfen **itirafını belirt.**')
db.add(`itirafsayı_${message.author.id}`, +1)
let veri = db.fetch(`itirafsayı_${message.author.id}`)
if( veri == 1) x = "ilk itirafı"
else x = veri
let embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setAuthor('Bir itiraf belirdi.')
.setDescription(`━━━━・İtiraf Bilgileri・━━━━ \n\n- Bu kaçıncı itirafı ? : **${veri}.** itirafı \n\n- İtiraf tarihi : **${moment().add(3, 'hours').format("LLLL")}** \n\n- İtirafı :  \`\`\`${itiraf}\`\`\``)
.setTimestamp()
client.channels.get(kanal).send(embed)

}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};
  
exports.help = {
name: 'itiraf',
}