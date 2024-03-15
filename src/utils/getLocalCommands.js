import path from "path";
import getAllFiles from "./getAllFiles.js";

export default async function (exceptions = []) {
  let localCommands = [];
  const commandCategories = getAllFiles(
    path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "..",
      "commands"
    ),
    true
  );
  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = await import(commandFile);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  return localCommands;
}
