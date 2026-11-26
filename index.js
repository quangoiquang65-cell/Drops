require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Bot đã online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (!message.webhookId) return;
  if (message.channel.name !== "chung") return;
  if (!message.content) return;

  const target = message.guild.channels.cache.find(
    channel => channel.name === "drops"
  );

  if (!target) return;

  const embed = new EmbedBuilder()
    .setColor("#9B59B6")
    .setTitle("✨ FANTASY DROPS")
    .setDescription(message.content.slice(0, 4000))
    .setTimestamp();

  await target.send({ embeds: [embed] });
});

client.login(process.env.DISCORD_TOKEN);
