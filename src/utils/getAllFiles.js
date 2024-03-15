import fs from "fs";
import path from "path";

export default function getAllfiles(directory, foldersOnly = false) {
  let filesNames = [];
  const files = fs.readdirSync(directory, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      if (foldersOnly) {
        filesNames.push(filePath);
      } else {
        filesNames = filesNames.concat(getAllfiles(filePath, false));
      }
    } else {
      filesNames.push(filePath);
    }
  }
  return filesNames;
}
