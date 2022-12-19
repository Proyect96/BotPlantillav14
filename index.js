const Discord = require('discord.js')
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [3276799], partials: [Partials.Channel] });
const c = require('./config.json')
const fs = require('fs')

const log = console.log;

fclientur.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js'))

for (const file of slashcommandsFiles) {
    const slash = require(`./slashcmd/${file}`)
    log(`🟠 Slash - ${file}`)
    client.slashcommands.set(slash.data.name, slash)
}

client.on("ready", () => {
    console.log("BotListo")
})


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const slashcmds = client.slashcommands.get(interaction.commandName)

    if (!slashcmds) return;

    try {
        await slashcmds.run(client, interaction)
    } catch (e) {
        console.error(e)
    }
})

client.login(token)