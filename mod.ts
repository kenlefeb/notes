import console from "node:console";
import { sade, process, dayjs } from "./deps.ts";
import { Configuration } from "./src/Configuration.ts";
import { DailyNote } from "./src/DailyNote.ts";

const configFile: string = Configuration.defaultFile;
const cli = sade("notes");

cli
  .version("1.0.0")
  .option("-c, --config", "Provide path to custom config", configFile)
  .option("-d, --debug", "Enable debug mode", false);

cli
  .command("daily add [date]")
  .describe(
    "Create a new Daily Note for the optional given date. If you don't provide a date, it will default to today."
  )
  .example("daily add 2021-01-01")
  .example("daily add")
  .action(async (date, options) => {
    if (options.debug) {
      console.log("Date:", date);
      console.log("Options:", options);
      console.log("Config File:", options.config ?? configFile);
    }

    const configuration = await Configuration.load(
      options.config ?? configFile
    );

    if (options.debug) {
      console.log("Configuration:", configuration);
      console.log("Vault Path:", configuration.paths.vault);
    }

    const theDate: Date = date ? dayjs(date).toDate() : new Date();

    if (options.debug) {
      console.log("Date:", dayjs(theDate).format("YYYY-MM-DD"));
    }

    const note: DailyNote = await DailyNote.create(theDate, configuration);

    console.log(
      `Created new Daily Note for ${dayjs(note.date).format("YYYY-MM-DD")}`
    );

    if (options.debug) {
      console.log("Note Path:", note.path);
    }
  });

cli.parse(process.argv);
