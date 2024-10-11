#!/usr/bin/env node

// For details, see https://www.npmjs.com/package/sade

import sade from 'sade';
import {Configuration} from './configuration.ts';
import dayjs from 'dayjs';

const version: string = "1.0.0";
const configFile: string = '~/notes.config.ts';
const configuration: Configuration = Configuration.Load(configFile);
const cli = sade('notes');

cli
  .version(version)
  .option('-c, --config', 'Provide path to custom config', configFile);

  // Daily Notes
cli
  .command('daily add')
  .describe('Creates a new Daily Note.')
  .option('-d, --date', 'Specify today\'s date for the new note', dayjs().format('yyyy-MM-dd'))
  .example('daily add')
  .example('daily add --date 2024-12-25')
  .action((options) => {
    console.log('Configuration', configuration);
    console.log('> these are extra opts', options);

    const today:Date = dayjs(options.date).toDate();
    console.log(`> assuming today is ${today}`);
  });

cli.parse(process.argv);
