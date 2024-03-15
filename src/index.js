import { Client, IntentsBitField } from "discord.js";
import { config } from "dotenv";
import eventHandlers from "./handlers/eventHandlers.js";

config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
eventHandlers(client);
// client.on("messageCreate", (message) => {
//   if (message.author.bot) return;
//   if (message.content === "hello") {
//     message.reply({
//       content: `Hi **${message.author.username}** from ${client.user.tag} !🥳`,
//     });
//   }
// });
// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "ping") {
//     await interaction.reply("Pong!");
//   }
//   if (interaction.commandName === "avatar") {
//     const avatarUrl = interaction.user.displayAvatarURL({
//       dynamic: true,
//       format: "png",
//       size: 4096,
//     });
//     await interaction.reply({
//       content: `Here is your avatar: ${avatarUrl}`,
//     });
//   }
// });

client.login(process.env.TOKEN);
