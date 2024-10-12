import path from "node:path";
import { dayjs } from "../deps.ts";
import type { Configuration } from "./Configuration.ts";
import { FileSystem } from "./FileSystem.ts";

export class DailyNote {
  date: Date = new Date();
  path!: string;
  public static async create(
    date: Date,
    configuration: Configuration
  ): Promise<DailyNote> {
    const note = new DailyNote();
    note.date = date;
    note.path = getPath(date, configuration);

    if (FileSystem.fileExists(note.path)) {
      throw new Error(`File already exists: ${note.path}`);
    }

    if (!(await FileSystem.directoryExists(path.dirname(note.path)))) {
      await FileSystem.createDirectory(path.dirname(note.path));
    }

    await Deno.writeTextFile(
      note.path,
      `# ${dayjs(date).format("dddd, MMMM D, YYYY")}\n\n`
    );

    return note;
  }
}

function getPath(date: Date, configuration: Configuration): string {
  const subpath = dayjs(date).format("YYYY/MM MMMM/DD dddd/YYYY-MM-DD[.md]");
  return path.join(configuration.Journal, path.normalize(subpath));
}
