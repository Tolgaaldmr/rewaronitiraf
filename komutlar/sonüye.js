const Discord = require('discord.js');
exports.run = (client, message, args) => { 
let otuzgündegirenler = message.guild.members.filter(üye => !üye.user.bot && new Date().getTime() - üye.joinedAt.getTime() < 30*24*60*60*1000).size
let ongündegirenler = message.guild.members.filter(üye => !üye.user.bot && new Date().getTime() - üye.joinedAt.getTime() < 10*24*60*60*1000).size
let birgündegirenler = message.guild.members.filter(üye => !üye.user.bot && new Date().getTime() - üye.joinedAt.getTime() < 1*24*60*60*1000).size

let ce = message.channel
const codeming = new Discord.RichEmbed()
.setDescription(`Kaç Gün Önce Kaç Kişi Girdi \n\n 30 Gün İçinde Giren Kişi Sayısı: ${otuzgündegirenler} \n\n 10 Gün İçerisinde Giren Kişi Sayısı: ${ongündegirenler} \n\n Sunucuya Bugün Giren Kişi Sayısı ; ${birgündegirenler}`)
ce.send(codeming)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['üye-bilgi'], 
  permLevel: 0
};

exports.help = {
  name: 'son-üyeler',
  description: 'taslak', 
  usage: 'sayac-hg-msg'
}; 