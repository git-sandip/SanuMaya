const pingCommand = {
  name: "ping",
  description: "Pong!",
  // devOnly:Boolean
  //testOnly:Boolean
  //deleted:true
  callback(client, interaction) {
    interaction.reply(`Pong! ${client.ws.ping}`);
  },
};

export default pingCommand;
