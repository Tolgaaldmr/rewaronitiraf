const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async(client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(' Bu komuta erişim sağlamak için **ADMINISTRATOR** yetkisine **sahip olmalısın.** ')

const embed = new Discord.RichEmbed()

.setColor("blue")
.setTitle("İtiraf Botu | Rewaron")
.setTimestamp() //Bu Ek Saati'de Yollamaya Yarar
.setDescription("**.itiraf-sistemi** - İtiraf sistemi ile ilgili tüm komutlara ulaşabilirsiniz.\n **.sigara** - Sigara içmeniz konusunda size yardımcı olur.\n **.son-üyeler** - Sunucuya son giren kişi sayısı hakkında bilgi verir.\n **.afk** - Afk moduna geçersiniz.\n **.istatistik** - Bot'un İstatistiklerini gösterir.\n **.gifara** - İstediğiniz gifi bulur.")
.setFooter("İyi kullanımlar dilerim.")
.setImage("")
.setThumbnail("https://media.discordapp.net/attachments/757059315306725699/762096426711777310/Rewaron_1.jpg")

message.channel.send(embed)

}

exports.conf = {
enabled: true, //Komutun Aktif Olup Olmamasını Ayarlarsınız! true: Aktif | false: Kapalı
guildOnly: false, //Komutun Sunucu Dışında Aktif Olup Olmamasını Ayarlarsınız! true: Aktif | false: Kapalı
aliases: [], //Ekstra Komut Anahtarları Gire Bilirsiniz! ["Anahtar-ismi"] Gibi
permLevel: 0 //Kullanım Seviyelerini Ayarlarsınız 0 Herkes Kullana Bilir Demektir!
};

exports.help = {
name: 'yardım',
description: 'açıklama yapar',
usage: 'yardım'
}


///BERK