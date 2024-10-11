import * as path from "@std/path";

export class Configuration {

    static Load(configFile: string): Configuration {
      return new Configuration(); // TODO: Allow loading of config file
    }
    today: Date = new Date();
    vault: string = 'C:\\dev\\doc';
    journal: string = path.join(this.vault, '@');
    rolodex: string = path.join(this.vault, '=');
    encyclopedia: string = path.join(this.vault, '#');
    library: string = path.join(this.vault, 'lib');
}