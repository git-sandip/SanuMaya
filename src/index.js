import { Client, IntentsBitField } from "discord.js";
import { config } from "dotenv";
config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message.reply({
    content: `Hi **${message.author.username}** from ${client.user.tag} !🥳`,
  });
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
  if (interaction.commandName === "avatar") {
    const avatarUrl = interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 4096,
    });
    await interaction.reply({
      content: `Here is your avatar: ${avatarUrl}`,
    });
  }
});

client.login(process.env.TOKEN);
