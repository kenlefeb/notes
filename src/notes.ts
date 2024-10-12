#!/usr/bin/env deno run --allow-net --allow-read

// For details, see https://www.npmjs.com/package/sade

import sade from 'sade';
import { format } from 'date-fns';
import process from "node:process";
import { Configuration } from "./Configuration.ts";

const configFile: string = '/home/node/notes.config.json';
const prog = sade('notes');

prog
  .version('1.0.0')
  .option('-c, --config', 'Provide path to custom config', configFile);

prog
  .command('daily add <date>')
  .describe('Create a new Daily Note for the optional given date. If you don\'t provide a date, it will default to today.')
  .example('daily add 2021-01-01')
  .example('daily add')
  .action(async (date, options) => {

    const configuration = await Configuration.load(options.config ?? configFile);
    const note = await DailyNotes.create(date, configuration);

    console.log(`Created new Daily Note for ${format(note.date, 'yyyy-MM-dd')}`);
    console.log(`> ${note.path}`);
  });

prog.parse(process.argv);
