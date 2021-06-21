const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
let color = "GREEN";
let prefix = ",";
let white_check_mark = "✅"

bot.on("ready", async () => {
    console.log(`A(z) ,,${bot.user.username}'' online mostantól ${bot.guilds.cache.size} szerveren!`);
    console.log(`A bot jelenlegi prefixe: ${prefix}`)
    setInterval(() => {
        const statuses = [
        `Az aurám fenyegető! | ${prefix}help`,
        `Az aurám fenyegető! | ${prefix}help`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setActivity(status, { type: 'PLAYING'})
    }, 5000)
});

bot.on("message", async message => {
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    var embed = new Discord.MessageEmbed()

    if(cmd == `${prefix}help`) {
        if(args.length == 0) {
            message.react(white_check_mark)
            message.channel.send("Az információkat elküldtem privátban!")
            embed.setTitle(`A(z) ,,${bot.user.username}'' bot jelenlegi parancsai:`)
            .addField(`${prefix}help`, `Eme lista megjelenítése`)
            .setColor(`${color}`)
            .setTimestamp()
            .setFooter(`${bot.user.username} - ${prefix}help`, bot.user.avatarURL)
            message.author.send(embed)
        }
    }

    if(cmd == `${prefix}say`) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            if(message.member.user.tag == "Lecso01#6407") {
                if(args.length == 0) {
                    message.delete()
                    message.author.send(`${message.member}!\nKérlek add meg, hogy milyen üzenetet küldjek ki a csatornába!`)
                } else {
                    let üzenet = args.join(" ")
                    message.channel.send(`${üzenet}`)
                }
            } else {
                message.delete()
                message.author.send("Nincs jogosultságod a parancs használatához!")
            }
        } else if(message.member.hasPermission("ADMINISTRATOR")) {
            if(args.length == 0) {
                message.delete()
                message.author.send(`${message.member}!\nKérlek add meg, hogy milyen üzenetet küldjek ki a csatornába!`)
            } else {
                let üzenet = args.join(" ")
                message.channel.send(`${üzenet}`)
            }
        }
    }

});

bot.login(process.env.TOKEN);