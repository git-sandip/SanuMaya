import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

const banCommand = {
  name: "ban",
  description: "Bans a member from the server!",
  // devOnly:Boolean
  //testOnly:Boolean
  //deleted:true
  options: [
    {
      name: "target-user",
      description: "The user to ban!",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "The reason for banning!",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  callback(client, interaction) {
    interaction.reply("ban");
  },
};

export default banCommand;
