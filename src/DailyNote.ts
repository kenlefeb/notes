import path from "node:path";
import { dayjs } from "../deps.ts";
import type { Configuration } from "./Configuration.ts";

export class DailyNote {
  date: Date = new Date();
  path!: string;
  public static create(date: Date, configuration: Configuration): DailyNote {
    const note = new DailyNote();
    note.date = date;
    note.path = getPath(date, configuration);
    return note;
  }
}

function getPath(date: Date, configuration: Configuration): string {
  const subpath = dayjs(date).format("YYYY/MM MMMM/DD dddd/YYYY-MM-DD[.md]");
  return path.join(configuration.paths.journal, path.normalize(subpath));
}
