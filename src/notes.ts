#!/usr/bin/env deno run --allow-net --allow-read

// For details, see https://www.npmjs.com/package/sade

import sade from 'sade';
import { format } from 'date-fns';
import process from "node:process";

const prog = sade('notes');

const defaultConfig = {
  configFile: '/home/node/notes.config.ts',
  today: format(new Date(), 'yyyy-MM-dd'),
};

prog
  .version('1.0.0')
  .option('--date, -d', 'The date to use for "today"', defaultConfig.today)
  .option('-c, --config', 'Provide path to custom config', defaultConfig.configFile);

prog
  .command('daily')
  .describe('Build the source directory. Expects an `index.js` entry file.')
  .option('-o, --output', 'Change the name of the output file', 'bundle.js')
  .example('build src build --global --config ~/notes.config.ts')
  .example('build app public -o main.js')
  .action(async (src, dest, opts) => {
    let config = { ...defaultConfig };

    if (opts.config) {
      try {
        const importedConfig = await import(`file://${opts.config}`);
        config = { ...config, ...importedConfig.default };
        console.log('> loaded config', config);
       } catch (error) {
        console.error(`> error loading config: ${opts.config}`);
        console.error(error);
        process.exit(1);
      }
    }

    console.log(`> building from ${src} to ${dest}`);
    console.log('> these are extra opts', opts);
    console.log('> using config', config);
  });

prog.parse(process.argv);
