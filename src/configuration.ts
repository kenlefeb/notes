export class Configuration {

  today: Date = new Date();
  paths: Paths = new Paths();

  static async load(path: string) {

    if (fileExists(path)) {
      return await loadFromFile();
    } else {
      return new Configuration();
    }

    async function loadFromFile() {
      const configData = JSON.parse(await Deno.readTextFile(path));
      const config = new Configuration();
      Object.assign(config, configData);
      return config;
    }

    function fileExists(path: string): boolean {
      try {
        const stat = Deno.statSync(path);
        return stat.isFile;
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          return false;
        } else {
          throw error;
        }
      }
    }

  }

}

export class Paths {
  vault: string = "~/notes"; // This contains all notes
  journal: string = `${this.vault}/@`; // This contains daily notes
  rolodex: string = `${this.vault}/=`; // This contains notes about specific entities (people, places, things)
  encyclopedia: string = `${this.vault}/#`; // This contains notes about topics
  library: string = `${this.vault}/$`; // This contains system files, such as templates
}
