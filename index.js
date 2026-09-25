const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = "1544756785460551680"; 
const GUILD_ID = "1534480234349592597";

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    try {
        const guild = await client.guilds.fetch(GUILD_ID);
        const channel = await guild.channels.fetch(CHANNEL_ID);

        if (channel && channel.isVoiceBased()) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });
            console.log(`Successfully joined voice channel: ${channel.name}`);
        } else {
            console.log("Voice channel not found or invalid!");
        }
    } catch (error) {
        console.error("Error joining voice channel:", error);
    }
});

client.login(TOKEN);
