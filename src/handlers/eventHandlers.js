import getAllFiles from "../utils/getAllFiles.js";
import path from "path";

export default function eventHandlers(client) {
  const eventFolders = getAllFiles(
    path.join(path.dirname(new URL(import.meta.url).pathname), "..", "events"),
    true
  );

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);
    console.log(eventFiles);
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    client.on(eventName, async (args) => {
      for (const eventFile of eventFiles) {
        const { default: eventFunction } = await import(eventFile);
        await eventFunction(client, args);
      }
    });
  }
}
