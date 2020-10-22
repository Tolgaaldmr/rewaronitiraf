const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Rewaron");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)


const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const fs = require('fs');
const DBL = require('dblapi.js');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const ytdl = require('ytdl-core');
const generator = require('generate-password');
const math = require('math-expression-evaluator')
const db = require('quick.db')
const moment = require('moment');
const ms = require('parse-ms');
const GIFEncoder = require('gifencoder');
require('moment-duration-format')
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("guildMemberAdd", cmember => {
let cuser = client.users.get(cmember.id)
let mmt = require('moment')
mmt.locale('tr')

let kanal = client.channels.get("762101483755143238")
if(!kanal) return

const kurulus = new Date().getTime() - cuser.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;

if (kurulus > 2629800000) kontrol = "Güvenli";
if (kurulus < 2629800000) kontrol = "Şüpheli";


let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor("Sunucuya hoşgeldin!", cmember.guild.iconURL)
.setDescription(`

<a:yenilik:759157170226593822> **Hoşgeldin** <@${cmember.id}> **Seninle Beraber** **__${cmember.guild.members.size}__** **Kişiyiz!** 
<a:kayt:759157178627129405> **Kaydının yapılması için gerçek adını vermen gerekli.** 
<a:davet:759157174223241226> **<@471355782147997717> || Yetkili seninle ilgilenecektir.** 
<a:728664861483204720:759157054350557215> **Herhangi bir sorun olursa yetkiliye söyleyiniz.!**


<a:726010592019873862:759157056061308930> Hesap oluşturulma tarihi: ${moment(cmember.user.createdAt).format("DD/MM/YYYY")}

<a:698564870785990856:760449984927236106> Hesap güvenlir mi? : **${kontrol}**
    `)
kanal.send(embed)
})

client.on("roleCreate", async(osman) => {

let kanal = "762102073462095893"

let entry = await osman.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
let kişi = client.users.get(entry.executor.id)

if (kişi.id === ayarlar.sahip) return
if (kişi.id === osman.guild.owner.id) return
if (kişi.id === client.user.id) return

osman.guild.channels.get(kanal).send(new Discord.RichEmbed().setColor("FF0000")
.setAuthor(`${client.kişi.username} │ Rol Açıldı`, client.user.avatarURL)
.setThumbnail(kişi.avatarURL)
.setDescription(`
Kişi Adı » **${kişi.username}** (${kişi.id})
Kişi Etiket » <@${kişi.id}>
Rol » **${osman.name}** (${osman.id})
`))})

client.on('voiceStateUpdate', member => {
client.guilds.get("757055098718388367").channels.get('757055099221835821').members.forEach(c =>{
  setTimeout(() => {
c.addRole('762107681204076554')
 }, 600000) // 60000 = 60 Saniye 1000 = 1 saniye
})
})


client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("ready", () => {
  const channel = client.channels.get("757055099221835821");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    // Yay, it worked!
    console.log("Successfully connected.");
  }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e);
  });
});

client.on("message", async (message, guild) => {
if(message.author.bot === true) return
  var miranafk = db.get(`kullanicilar.${message.author.id}.afk`);
  if (!miranafk) return;
  var afkb = JSON.parse(miranafk);
  if (new Date().getTime() - afkb.zaman < 1000) return;
  db.delete(`kullanicilar.${message.author.id}.afk`);
  var süre = new Date().getTime() - afkb.zaman;

    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    message.channel.send(
      ":hugging: | AFK modundan ayrıldınız. <@" +
        message.author.id +
        ">. Afk kaldığın süre:** " +
        sürem +
        "**"
    );

});
//
client.on("message", async (message, guild) => {
  let etiket = message.mentions.users.first();
  if (!etiket) return;
  var afaka = db.fetch(`kullanicilar.${etiket.id}.afk`);
  if (!afaka) return;
  var afk = JSON.parse(afaka);
  if (!afk) return;
  var süre = new Date().getTime() - afk.zaman;
    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    if (afk) {
      return message.channel.send(
        `**${etiket.tag}** adlı kullanıcı **${sürem}**dir **${afk.sebep}** sebebiyle afk!`
      );
    }
  

});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

////////KOMUTLAR BURDAN SONRA



client.login(ayarlar.token);
