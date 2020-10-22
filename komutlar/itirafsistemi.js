const Discord = require('discord.js');
const botadi = "Presidente"
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`İtiraf Sistemi`)
.setTimestamp()
.addField('.itiraf <itirafınız>', `İtiraf yapmanızı sağlar.`)
.addField('.itiraf-log <kanal>', `İtiraf kanalını ayarlarsınız.`)
.setFooter(`Developer : Rewaron`, client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['itirafsistemi', 'itiraf-yardım'], 
  permLevel: 0 
};

exports.help = {
  name: 'itiraf-sistemi',
  description: 'Tüm komutları gösterir.',
  usage: 'itirafyardım'
};