import getApplicationCommands from "../../utils/getApplicationCommands.js";
import getLocalCommands from "../../utils/getLocalCommands.js";

import configData from "../../../config.json" assert { type: "json" };
import areCommandsDifferent from "../../utils/areCommandsDifferent.js";

export default async function (client) {
  try {
    const localCommands = await getLocalCommands();

    const applicationCommands = await getApplicationCommands(
      client,
      configData.testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    console.log(`TThere was an error: ${error}`);
  }
}
