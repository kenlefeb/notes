import console from "node:console";
import { sade, process, dayjs } from "./deps.ts";
import { Configuration } from "./src/Configuration.ts";
import { DailyNote } from "./src/DailyNote.ts";

const configFile: string = Configuration.defaultFile;
const cli = sade("notes");

cli
  .version("1.0.0")
  .option("-c, --config", "Provide path to custom config", configFile);

cli
  .command("daily add [date]")
  .describe(
    "Create a new Daily Note for the optional given date. If you don't provide a date, it will default to today."
  )
  .example("daily add 2021-01-01")
  .example("daily add")
  .action(async (date, options) => {
    const configuration = await Configuration.load(
      options.config ?? configFile
    );
    const theDate: Date = date ? dayjs(date).toDate() : new Date();
    const note: DailyNote = await DailyNote.create(theDate, configuration);

    console.log(
      `Created new Daily Note for ${dayjs(note.date).format("YYYY-MM-DD")}`
    );
    console.log(`> ${note.path}`);
  });

cli.parse(process.argv);
